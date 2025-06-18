using Microsoft.AspNetCore.Mvc;
using Api.Services.Interfaces;
using Api.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BadgeController : ControllerBase
    {
        private readonly IBadgeService _badgeService;
        private readonly ILogger<BadgeController> _logger;

        public BadgeController(IBadgeService badgeService, ILogger<BadgeController> logger)
        {
            _badgeService = badgeService;
            _logger = logger;
        }

        [HttpGet("user-badges")]
        public async Task<ActionResult<List<BadgeDto>>> GetUserBadges()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized();
                }

                var badges = await _badgeService.GetUserBadgesAsync(userId);
                return Ok(badges);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user badges");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("user-progress")]
        public async Task<ActionResult<UserProgressDto>> GetUserProgress()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized();
                }

                var progress = await _badgeService.GetUserProgressAsync(userId);
                return Ok(progress);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user progress");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpPost("quiz-completion")]
        public async Task<ActionResult<List<BadgeDto>>> ProcessQuizCompletion([FromBody] QuizCompletionDto quizCompletion)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized();
                }

                var newBadges = await _badgeService.ProcessQuizCompletionAsync(userId, quizCompletion);
                return Ok(new { newBadges, message = "Quiz completion processed successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing quiz completion");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }
    }
} 