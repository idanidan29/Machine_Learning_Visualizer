using System.Threading.Tasks;
using Api.Models;

namespace Api.Services.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetByIdAsync(string id);
        Task<User> GetByEmailAsync(string email);
        Task<User> CreateAsync(User user);
        Task UpdateAsync(User user);
        Task<bool> EmailExistsAsync(string email);
    }
}

