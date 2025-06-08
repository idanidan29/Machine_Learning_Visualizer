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
                string projectId = configuration["FirestoreSettings:ProjectId"];
                
                _logger.LogInformation($"Attempting to initialize Firestore with project ID: {projectId}");
                
                if (string.IsNullOrEmpty(projectId))
                {
                    throw new InvalidOperationException("Firestore project ID is not configured");
                }

                // Create Firestore client using default credentials from environment
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