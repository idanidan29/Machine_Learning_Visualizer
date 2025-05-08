// Services/Interfaces/IAuthService.cs
using System.Threading.Tasks;
using Api.Models;
using Api.Models.DTOs;

namespace Api.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
        Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
        string GenerateJwtToken(User user);
    }
}
