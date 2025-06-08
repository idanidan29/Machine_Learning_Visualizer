// Services/FirestoreService.cs
using Google.Cloud.Firestore;
using Microsoft.Extensions.Logging;

namespace Api.Services
{
    public class FirestoreService
    {
        private readonly FirestoreDb _firestoreDb;
        private readonly ILogger<FirestoreService> _logger;

        public FirestoreService(IConfiguration configuration, ILogger<FirestoreService> logger)
        {
            _logger = logger;
            try
            {
                // Set the environment variable for credentials
                string credentialsPath = configuration["FirestoreSettings:CredentialsPath"];
                string projectId = configuration["FirestoreSettings:ProjectId"];
                
                _logger.LogInformation($"Attempting to initialize Firestore with credentials at: {credentialsPath}");
                
                if (string.IsNullOrEmpty(credentialsPath))
                {
                    throw new InvalidOperationException("Firestore credentials path is not configured");
                }

                if (string.IsNullOrEmpty(projectId))
                {
                    throw new InvalidOperationException("Firestore project ID is not configured");
                }

                // Set the environment variable
                Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", credentialsPath);
                
                // Create Firestore client
                _firestoreDb = FirestoreDb.Create(projectId);
                _logger.LogInformation("Firestore client initialized successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error initializing Firestore client");
                throw;
            }
        }

        public FirestoreDb GetFirestoreDb() => _firestoreDb;
    }
}