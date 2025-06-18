using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Models;
using Api.Models.DTOs;

namespace Api.Services.Interfaces
{
    public interface IBadgeService
    {
        Task<List<BadgeDto>> GetUserBadgesAsync(string userId);
        Task<UserProgressDto> GetUserProgressAsync(string userId);
        Task<List<BadgeDto>> ProcessQuizCompletionAsync(string userId, QuizCompletionDto quizCompletion);
        Task<List<BadgeDto>> CheckAndAwardBadgesAsync(string userId);
        Task<BadgeDto> AwardBadgeAsync(string userId, string badgeType, int progress = 0);
        Task<bool> HasBadgeAsync(string userId, string badgeType);
    }
} 