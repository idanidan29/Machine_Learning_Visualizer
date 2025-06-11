using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Api.Models;
using Api.Services.Interfaces;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Text.Json;
using System.Text;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class OAuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly ILogger<OAuthController> _logger;

        public OAuthController(
            IAuthService authService,
            IUserRepository userRepository,
            IConfiguration configuration,
            HttpClient httpClient,
            ILogger<OAuthController> logger)
        {
            _authService = authService;
            _userRepository = userRepository;
            _configuration = configuration;
            _httpClient = httpClient;
            _logger = logger;
        }

        [HttpPost("google/callback")]
        public async Task<IActionResult> GoogleCallback([FromBody] GoogleCallbackDto callbackDto)
        {
            try
            {
                _logger.LogInformation("Received Google callback with code");
                
                // Exchange the authorization code for tokens
                var tokenResponse = await ExchangeCodeForTokens(callbackDto.Code);
                _logger.LogInformation("Successfully exchanged code for tokens");

                // Validate the ID token
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new[] { _configuration["Google:ClientId"] }
                };

                var payload = await GoogleJsonWebSignature.ValidateAsync(tokenResponse.IdToken, settings);
                _logger.LogInformation($"Successfully validated ID token for user: {payload.Email}");
                
                // Check if user exists
                var user = await _userRepository.GetByEmailAsync(payload.Email);
                
                if (user == null)
                {
                    _logger.LogInformation($"Creating new user for email: {payload.Email}");
                    // Create new user
                    user = new User
                    {
                        Email = payload.Email,
                        FirstName = payload.GivenName,
                        LastName = payload.FamilyName,
                        CreatedAt = DateTime.UtcNow,
                        LastLogin = DateTime.UtcNow
                    };

                    user = await _userRepository.CreateAsync(user);
                    _logger.LogInformation($"Created new user with ID: {user.Id}");
                }
                else
                {
                    _logger.LogInformation($"Updating existing user: {user.Id}");
                    // Update last login
                    user.LastLogin = DateTime.UtcNow;
                    await _userRepository.UpdateAsync(user);
                }

                // Generate JWT token
                var token = _authService.GenerateJwtToken(user);
                _logger.LogInformation($"Generated JWT token for user: {user.Id}");

                return Ok(new
                {
                    userId = user.Id,
                    email = user.Email,
                    firstName = user.FirstName,
                    lastName = user.LastName,
                    token = token,
                    expiration = DateTime.UtcNow.AddHours(24)
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing Google callback");
                return BadRequest(new { message = ex.Message });
            }
        }

        private async Task<GoogleTokenResponse> ExchangeCodeForTokens(string code)
        {
            var tokenEndpoint = "https://oauth2.googleapis.com/token";
            var clientId = _configuration["Google:ClientId"];
            var clientSecret = _configuration["Google:ClientSecret"];
            var redirectUri = _configuration["Google:RedirectUri"];

            _logger.LogInformation($"Exchanging code for tokens. ClientId: {clientId}, RedirectUri: {redirectUri}");

            var tokenRequest = new
            {
                code = code,
                client_id = clientId,
                client_secret = clientSecret,
                redirect_uri = redirectUri,
                grant_type = "authorization_code"
            };

            var response = await _httpClient.PostAsync(
                tokenEndpoint,
                new StringContent(JsonSerializer.Serialize(tokenRequest), Encoding.UTF8, "application/json")
            );

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                _logger.LogError($"Failed to exchange code for tokens. Status: {response.StatusCode}, Error: {error}");
                throw new Exception($"Failed to exchange code for tokens: {error}");
            }

            var content = await response.Content.ReadAsStringAsync();
            _logger.LogInformation("Successfully received token response");
            return JsonSerializer.Deserialize<GoogleTokenResponse>(content);
        }
    }

    public class GoogleCallbackDto
    {
        public string Code { get; set; }
    }

    public class GoogleTokenResponse
    {
        public string AccessToken { get; set; }
        public string IdToken { get; set; }
        public string RefreshToken { get; set; }
        public int ExpiresIn { get; set; }
        public string TokenType { get; set; }
    }
} 