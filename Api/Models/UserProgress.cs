using System;
using System.Collections.Generic;
using Google.Cloud.Firestore;

namespace Api.Models
{
    [FirestoreData]
    public class UserProgress
    {
        [FirestoreDocumentId]
        public string UserId { get; set; }
        
        [FirestoreProperty]
        public int TotalQuizzesCompleted { get; set; }
        
        [FirestoreProperty]
        public int PerfectScores { get; set; }
        
        [FirestoreProperty]
        public int TotalScore { get; set; }
        
        [FirestoreProperty]
        public int TotalQuestionsAnswered { get; set; }
        
        [FirestoreProperty]
        public Dictionary<string, int> AlgorithmQuizCounts { get; set; } = new Dictionary<string, int>();
        
        [FirestoreProperty]
        public Dictionary<string, int> AlgorithmScores { get; set; } = new Dictionary<string, int>();
        
        [FirestoreProperty]
        public int CurrentStreak { get; set; }
        
        [FirestoreProperty]
        public int LongestStreak { get; set; }
        
        [FirestoreProperty]
        public DateTime LastQuizDate { get; set; }
        
        [FirestoreProperty]
        public DateTime CreatedAt { get; set; }
        
        [FirestoreProperty]
        public DateTime UpdatedAt { get; set; }
    }
} 