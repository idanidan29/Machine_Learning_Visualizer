// Services/FirestoreService.cs
using Google.Cloud.Firestore;

namespace JobTrackerApi.Services
{
    public class FirestoreService
    {
        private readonly FirestoreDb _firestoreDb;

        public FirestoreService(IConfiguration configuration)
        {
            // Set the environment variable for credentials
            string credentialsPath = configuration["FirestoreSettings:CredentialsPath"];
            string projectId = configuration["FirestoreSettings:ProjectId"];
            
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", credentialsPath);
            
            // Create Firestore client
            _firestoreDb = FirestoreDb.Create(projectId);
        }

        public FirestoreDb GetFirestoreDb() => _firestoreDb;
    }
}