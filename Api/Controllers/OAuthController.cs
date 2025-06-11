using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Api.Models;
using Api.Services.Interfaces;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;

namespace Api.Controllers
{
    [Route("auth")]
    [ApiController]
    public class OAuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public OAuthController(
            IAuthService authService,
            IUserRepository userRepository,
            IConfiguration configuration)
        {
            _authService = authService;
            _userRepository = userRepository;
            _configuration = configuration;
        }

        [HttpPost("google/callback")]
        public async Task<IActionResult> GoogleCallback([FromBody] GoogleCallbackDto callbackDto)
        {
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new[] { _configuration["Google:ClientId"] }
                };

                var payload = await GoogleJsonWebSignature.ValidateAsync(callbackDto.Code, settings);
                
                // Check if user exists
                var user = await _userRepository.GetByEmailAsync(payload.Email);
                
                if (user == null)
                {
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
                }
                else
                {
                    // Update last login
                    user.LastLogin = DateTime.UtcNow;
                    await _userRepository.UpdateAsync(user);
                }

                // Generate JWT token
                var token = _authService.GenerateJwtToken(user);

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
                return BadRequest(new { message = ex.Message });
            }
        }
    }

    public class GoogleCallbackDto
    {
        public string Code { get; set; }
    }
} 