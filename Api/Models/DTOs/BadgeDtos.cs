using System;
using System.Collections.Generic;

namespace Api.Models.DTOs
{
    public class BadgeDto
    {
        public string Id { get; set; }
        public string BadgeType { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; }
        public string Color { get; set; }
        public DateTime EarnedAt { get; set; }
        public int Progress { get; set; }
        public int RequiredProgress { get; set; }
        public bool IsCompleted { get; set; }
    }

    public class UserProgressDto
    {
        public int TotalQuizzesCompleted { get; set; }
        public int PerfectScores { get; set; }
        public int TotalScore { get; set; }
        public int TotalQuestionsAnswered { get; set; }
        public Dictionary<string, int> AlgorithmQuizCounts { get; set; }
        public int CurrentStreak { get; set; }
        public int LongestStreak { get; set; }
        public List<BadgeDto> Badges { get; set; } = new List<BadgeDto>();
    }

    public class QuizCompletionDto
    {
        public string AlgorithmType { get; set; }
        public int Score { get; set; }
        public int TotalQuestions { get; set; }
        public bool IsPerfectScore { get; set; }
        public int Streak { get; set; }
    }
} 