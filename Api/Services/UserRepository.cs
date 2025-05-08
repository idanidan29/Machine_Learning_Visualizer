using System;
using System.Threading.Tasks;
using Google.Cloud.Firestore;
using Api.Models;
using Api.Services.Interfaces;

namespace Api.Services
{
    public class FirestoreUserRepository : IUserRepository
    {
        private readonly FirestoreDb _firestoreDb;
        private readonly CollectionReference _usersCollection;

        public FirestoreUserRepository(FirestoreService firestoreService)
        {
            _firestoreDb = firestoreService.GetFirestoreDb();
            _usersCollection = _firestoreDb.Collection("users");
        }

        public async Task<User> GetByIdAsync(string id)
        {
            DocumentSnapshot snapshot = await _usersCollection.Document(id).GetSnapshotAsync();
            return snapshot.Exists ? snapshot.ConvertTo<User>() : null;
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            Query query = _usersCollection.WhereEqualTo("Email", email).Limit(1);
            QuerySnapshot querySnapshot = await query.GetSnapshotAsync();
            
            if (querySnapshot.Count == 0)
                return null;
                
            DocumentSnapshot doc = querySnapshot.Documents[0];
            User user = doc.ConvertTo<User>();
            user.Id = doc.Id;
            return user;
        }

        public async Task<User> CreateAsync(User user)
        {
            user.CreatedAt = DateTime.UtcNow;
            DocumentReference docRef = await _usersCollection.AddAsync(user);
            user.Id = docRef.Id;
            return user;
        }

        public async Task UpdateAsync(User user)
        {
            await _usersCollection.Document(user.Id).SetAsync(user, SetOptions.MergeAll);
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            Query query = _usersCollection.WhereEqualTo("Email", email).Limit(1);
            QuerySnapshot querySnapshot = await query.GetSnapshotAsync();
            return querySnapshot.Count > 0;
        }
    }
}