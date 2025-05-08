// Models/User.cs
using System;
using Google.Cloud.Firestore;

namespace Api.Models
{
    [FirestoreData]
    public class User
    {
        [FirestoreDocumentId]
        public string Id { get; set; }
        
        [FirestoreProperty]
        public string Email { get; set; }
        
        [FirestoreProperty]
        public string PasswordHash { get; set; }
        
        [FirestoreProperty]
        public string FirstName { get; set; }
        
        [FirestoreProperty]
        public string LastName { get; set; }
        
        [FirestoreProperty]
        public DateTime CreatedAt { get; set; }
        
        [FirestoreProperty]
        public DateTime? LastLogin { get; set; }
    }
}

