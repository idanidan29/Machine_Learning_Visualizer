using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;
using Api.Models.DTOs;
using Api.Services.Interfaces;
using Google.Cloud.Firestore;
using Microsoft.Extensions.Logging;

namespace Api.Services
{
    public class BadgeService : IBadgeService
    {
        private readonly FirestoreService _firestoreService;
        private readonly ILogger<BadgeService> _logger;
        private readonly CollectionReference _badgesCollection;
        private readonly CollectionReference _progressCollection;

        // Badge definitions
        private readonly Dictionary<string, BadgeDefinition> _badgeDefinitions = new Dictionary<string, BadgeDefinition>
        {
            ["first-quiz"] = new BadgeDefinition
            {
                Name = "First Steps",
                Description = "Complete your first quiz",
                Icon = "🎯",
                Color = "blue",
                RequiredProgress = 1
            },
            ["quiz-master"] = new BadgeDefinition
            {
                Name = "Quiz Master",
                Description = "Complete 10 quizzes",
                Icon = "🏆",
                Color = "gold",
                RequiredProgress = 10
            },
            ["perfect-score"] = new BadgeDefinition
            {
                Name = "Perfect Score",
                Description = "Get a perfect score on any quiz",
                Icon = "⭐",
                Color = "yellow",
                RequiredProgress = 1
            },
            ["streak-3"] = new BadgeDefinition
            {
                Name = "On Fire",
                Description = "Maintain a 3-day quiz streak",
                Icon = "🔥",
                Color = "orange",
                RequiredProgress = 3
            },
            ["streak-7"] = new BadgeDefinition
            {
                Name = "Week Warrior",
                Description = "Maintain a 7-day quiz streak",
                Icon = "⚡",
                Color = "purple",
                RequiredProgress = 7
            },
            ["algorithm-explorer"] = new BadgeDefinition
            {
                Name = "Algorithm Explorer",
                Description = "Complete quizzes on 5 different algorithms",
                Icon = "🧠",
                Color = "green",
                RequiredProgress = 5
            },
            ["speed-demon"] = new BadgeDefinition
            {
                Name = "Speed Demon",
                Description = "Complete 5 quizzes in one day",
                Icon = "🚀",
                Color = "red",
                RequiredProgress = 5
            },
            ["knowledge-seeker"] = new BadgeDefinition
            {
                Name = "Knowledge Seeker",
                Description = "Answer 50 questions correctly",
                Icon = "📚",
                Color = "indigo",
                RequiredProgress = 50
            },
            ["ml-expert"] = new BadgeDefinition
            {
                Name = "ML Expert",
                Description = "Complete all algorithm quizzes",
                Icon = "👑",
                Color = "diamond",
                RequiredProgress = 10
            }
        };

        public BadgeService(FirestoreService firestoreService, ILogger<BadgeService> logger)
        {
            _firestoreService = firestoreService;
            _logger = logger;
            var firestoreDb = _firestoreService.GetFirestoreDb();
            _badgesCollection = firestoreDb.Collection("badges");
            _progressCollection = firestoreDb.Collection("userProgress");
        }

        public async Task<List<BadgeDto>> GetUserBadgesAsync(string userId)
        {
            try
            {
                var query = _badgesCollection.WhereEqualTo("UserId", userId);
                var snapshot = await query.GetSnapshotAsync();
                
                return snapshot.Documents.Select(doc => new BadgeDto
                {
                    Id = doc.Id,
                    BadgeType = doc.GetValue<string>("BadgeType"),
                    Name = doc.GetValue<string>("Name"),
                    Description = doc.GetValue<string>("Description"),
                    Icon = doc.GetValue<string>("Icon"),
                    Color = doc.GetValue<string>("Color"),
                    EarnedAt = doc.GetValue<DateTime>("EarnedAt"),
                    Progress = doc.GetValue<int>("Progress"),
                    RequiredProgress = doc.GetValue<int>("RequiredProgress"),
                    IsCompleted = doc.GetValue<bool>("IsCompleted")
                }).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user badges for user {UserId}", userId);
                return new List<BadgeDto>();
            }
        }

        public async Task<UserProgressDto> GetUserProgressAsync(string userId)
        {
            try
            {
                var docRef = _progressCollection.Document(userId);
                var snapshot = await docRef.GetSnapshotAsync();
                
                if (!snapshot.Exists)
                {
                    return new UserProgressDto();
                }

                var progress = snapshot.ConvertTo<UserProgress>();
                var badges = await GetUserBadgesAsync(userId);

                return new UserProgressDto
                {
                    TotalQuizzesCompleted = progress.TotalQuizzesCompleted,
                    PerfectScores = progress.PerfectScores,
                    TotalScore = progress.TotalScore,
                    TotalQuestionsAnswered = progress.TotalQuestionsAnswered,
                    AlgorithmQuizCounts = progress.AlgorithmQuizCounts,
                    CurrentStreak = progress.CurrentStreak,
                    LongestStreak = progress.LongestStreak,
                    Badges = badges
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user progress for user {UserId}", userId);
                return new UserProgressDto();
            }
        }

        public async Task<List<BadgeDto>> ProcessQuizCompletionAsync(string userId, QuizCompletionDto quizCompletion)
        {
            try
            {
                // Update user progress
                var progress = await GetOrCreateUserProgressAsync(userId);
                
                progress.TotalQuizzesCompleted++;
                progress.TotalScore += quizCompletion.Score;
                progress.TotalQuestionsAnswered += quizCompletion.TotalQuestions;
                
                if (quizCompletion.IsPerfectScore)
                {
                    progress.PerfectScores++;
                }

                // Update algorithm-specific counts
                if (!progress.AlgorithmQuizCounts.ContainsKey(quizCompletion.AlgorithmType))
                {
                    progress.AlgorithmQuizCounts[quizCompletion.AlgorithmType] = 0;
                }
                progress.AlgorithmQuizCounts[quizCompletion.AlgorithmType]++;

                if (!progress.AlgorithmScores.ContainsKey(quizCompletion.AlgorithmType))
                {
                    progress.AlgorithmScores[quizCompletion.AlgorithmType] = 0;
                }
                progress.AlgorithmScores[quizCompletion.AlgorithmType] += quizCompletion.Score;

                // Update streak
                var today = DateTime.UtcNow.Date;
                if (progress.LastQuizDate.Date == today.AddDays(-1))
                {
                    progress.CurrentStreak++;
                    if (progress.CurrentStreak > progress.LongestStreak)
                    {
                        progress.LongestStreak = progress.CurrentStreak;
                    }
                }
                else if (progress.LastQuizDate.Date != today)
                {
                    progress.CurrentStreak = 1;
                }
                
                progress.LastQuizDate = today;
                progress.UpdatedAt = DateTime.UtcNow;

                // Save progress
                await SaveUserProgressAsync(progress);

                // Check and award badges
                return await CheckAndAwardBadgesAsync(userId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing quiz completion for user {UserId}", userId);
                return new List<BadgeDto>();
            }
        }

        public async Task<List<BadgeDto>> CheckAndAwardBadgesAsync(string userId)
        {
            var newBadges = new List<BadgeDto>();
            var progress = await GetUserProgressAsync(userId);

            // Check first quiz badge
            if (progress.TotalQuizzesCompleted == 1 && !await HasBadgeAsync(userId, "first-quiz"))
            {
                newBadges.Add(await AwardBadgeAsync(userId, "first-quiz"));
            }

            // Check quiz master badge
            if (progress.TotalQuizzesCompleted >= 10 && !await HasBadgeAsync(userId, "quiz-master"))
            {
                newBadges.Add(await AwardBadgeAsync(userId, "quiz-master", progress.TotalQuizzesCompleted));
            }

            // Check perfect score badge
            if (progress.PerfectScores >= 1 && !await HasBadgeAsync(userId, "perfect-score"))
            {
                newBadges.Add(await AwardBadgeAsync(userId, "perfect-score"));
            }

            // Check streak badges
            if (progress.CurrentStreak >= 3 && !await HasBadgeAsync(userId, "streak-3"))
            {
                newBadges.Add(await AwardBadgeAsync(userId, "streak-3", progress.CurrentStreak));
            }

            if (progress.CurrentStreak >= 7 && !await HasBadgeAsync(userId, "streak-7"))
            {
                newBadges.Add(await AwardBadgeAsync(userId, "streak-7", progress.CurrentStreak));
            }

            // Check algorithm explorer badge
            if (progress.AlgorithmQuizCounts.Count >= 5 && !await HasBadgeAsync(userId, "algorithm-explorer"))
            {
                newBadges.Add(await AwardBadgeAsync(userId, "algorithm-explorer", progress.AlgorithmQuizCounts.Count));
            }

            // Check knowledge seeker badge
            if (progress.TotalScore >= 50 && !await HasBadgeAsync(userId, "knowledge-seeker"))
            {
                newBadges.Add(await AwardBadgeAsync(userId, "knowledge-seeker", progress.TotalScore));
            }

            // Check ML expert badge (all 10 algorithms)
            if (progress.AlgorithmQuizCounts.Count >= 10 && !await HasBadgeAsync(userId, "ml-expert"))
            {
                newBadges.Add(await AwardBadgeAsync(userId, "ml-expert", progress.AlgorithmQuizCounts.Count));
            }

            return newBadges;
        }

        public async Task<BadgeDto> AwardBadgeAsync(string userId, string badgeType, int progress = 0)
        {
            try
            {
                if (!_badgeDefinitions.ContainsKey(badgeType))
                {
                    throw new ArgumentException($"Unknown badge type: {badgeType}");
                }

                var definition = _badgeDefinitions[badgeType];
                var badge = new Badge
                {
                    UserId = userId,
                    BadgeType = badgeType,
                    Name = definition.Name,
                    Description = definition.Description,
                    Icon = definition.Icon,
                    Color = definition.Color,
                    EarnedAt = DateTime.UtcNow,
                    Progress = progress,
                    RequiredProgress = definition.RequiredProgress,
                    IsCompleted = true
                };

                var docRef = await _badgesCollection.AddAsync(badge);
                badge.Id = docRef.Id;

                _logger.LogInformation("Awarded badge {BadgeType} to user {UserId}", badgeType, userId);

                return new BadgeDto
                {
                    Id = badge.Id,
                    BadgeType = badge.BadgeType,
                    Name = badge.Name,
                    Description = badge.Description,
                    Icon = badge.Icon,
                    Color = badge.Color,
                    EarnedAt = badge.EarnedAt,
                    Progress = badge.Progress,
                    RequiredProgress = badge.RequiredProgress,
                    IsCompleted = badge.IsCompleted
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error awarding badge {BadgeType} to user {UserId}", badgeType, userId);
                throw;
            }
        }

        public async Task<bool> HasBadgeAsync(string userId, string badgeType)
        {
            try
            {
                var query = _badgesCollection
                    .WhereEqualTo("UserId", userId)
                    .WhereEqualTo("BadgeType", badgeType);
                
                var snapshot = await query.GetSnapshotAsync();
                return snapshot.Count > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking badge {BadgeType} for user {UserId}", badgeType, userId);
                return false;
            }
        }

        private async Task<UserProgress> GetOrCreateUserProgressAsync(string userId)
        {
            var docRef = _progressCollection.Document(userId);
            var snapshot = await docRef.GetSnapshotAsync();
            
            if (snapshot.Exists)
            {
                return snapshot.ConvertTo<UserProgress>();
            }

            var newProgress = new UserProgress
            {
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await docRef.SetAsync(newProgress);
            return newProgress;
        }

        private async Task SaveUserProgressAsync(UserProgress progress)
        {
            var docRef = _progressCollection.Document(progress.UserId);
            await docRef.SetAsync(progress);
        }

        private class BadgeDefinition
        {
            public string Name { get; set; }
            public string Description { get; set; }
            public string Icon { get; set; }
            public string Color { get; set; }
            public int RequiredProgress { get; set; }
        }
    }
} 