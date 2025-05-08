using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Api.Models;
using Api.Models.DTOs;
using Api.Services.Interfaces;
using BC = BCrypt.Net.BCrypt;

namespace Api.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
        {
            bool emailExists = await _userRepository.EmailExistsAsync(registerDto.Email);
            if (emailExists)
            {
                throw new ApplicationException("Email is already registered");
            }

            // Hash password
            string passwordHash = BC.HashPassword(registerDto.Password);

            // Create user
            var user = new User
            {
                Email = registerDto.Email,
                PasswordHash = passwordHash,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                CreatedAt = DateTime.UtcNow
            };

            user = await _userRepository.CreateAsync(user);

            // Generate token
            string token = GenerateJwtToken(user);

            return new AuthResponseDto
            {
                UserId = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = token,
                Expiration = DateTime.UtcNow.AddHours(24)
            };
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _userRepository.GetByEmailAsync(loginDto.Email);
            if (user == null)
            {
                throw new ApplicationException("Invalid email or password");
            }

            bool isPasswordValid = BC.Verify(loginDto.Password, user.PasswordHash);
            if (!isPasswordValid)
            {
                throw new ApplicationException("Invalid email or password");
            }

            // Update last login
            user.LastLogin = DateTime.UtcNow;
            await _userRepository.UpdateAsync(user);

            // Generate token
            string token = GenerateJwtToken(user);

            return new AuthResponseDto
            {
                UserId = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = token,
                Expiration = DateTime.UtcNow.AddHours(24)
            };
        }

        public string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiration = DateTime.UtcNow.AddHours(24);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("firstName", user.FirstName),
                new Claim("lastName", user.LastName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: expiration,
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}