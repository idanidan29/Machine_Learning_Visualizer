using System;
using Google.Cloud.Firestore;

namespace Api.Models
{
    [FirestoreData]
    public class Badge
    {
        [FirestoreDocumentId]
        public string Id { get; set; }
        
        [FirestoreProperty]
        public string UserId { get; set; }
        
        [FirestoreProperty]
        public string BadgeType { get; set; }
        
        [FirestoreProperty]
        public string Name { get; set; }
        
        [FirestoreProperty]
        public string Description { get; set; }
        
        [FirestoreProperty]
        public string Icon { get; set; }
        
        [FirestoreProperty]
        public string Color { get; set; }
        
        [FirestoreProperty]
        public DateTime EarnedAt { get; set; }
        
        [FirestoreProperty]
        public int Progress { get; set; }
        
        [FirestoreProperty]
        public int RequiredProgress { get; set; }
        
        [FirestoreProperty]
        public bool IsCompleted { get; set; }
    }
} 