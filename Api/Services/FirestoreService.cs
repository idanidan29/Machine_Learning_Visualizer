// Services/FirestoreService.cs
using Google.Cloud.Firestore;
using Microsoft.Extensions.Logging;
using Google.Apis.Auth.OAuth2;
using System.Text.Json;

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

                GoogleCredential credential;
                
                // Try to get credentials from JSON string first
                string credentialsJson = Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS_JSON");
                _logger.LogInformation($"GOOGLE_APPLICATION_CREDENTIALS_JSON exists: {!string.IsNullOrEmpty(credentialsJson)}");
                
                if (!string.IsNullOrEmpty(credentialsJson))
                {
                    try
                    {
                        _logger.LogInformation("Attempting to parse credentials from JSON string");
                        
                        // Try to parse and validate the JSON first
                        var jsonDoc = JsonDocument.Parse(credentialsJson);
                        var root = jsonDoc.RootElement;
                        
                        // Validate required fields
                        if (!root.TryGetProperty("type", out _) ||
                            !root.TryGetProperty("project_id", out _) ||
                            !root.TryGetProperty("private_key", out _) ||
                            !root.TryGetProperty("client_email", out _))
                        {
                            throw new InvalidOperationException("Service account JSON is missing required fields");
                        }

                        credential = GoogleCredential.FromJson(credentialsJson);
                        _logger.LogInformation("Successfully parsed credentials from JSON");
                    }
                    catch (JsonException ex)
                    {
                        _logger.LogError(ex, "Failed to parse JSON string. Invalid JSON format.");
                        throw new InvalidOperationException("Invalid JSON format in credentials", ex);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Failed to parse credentials from JSON string");
                        throw new InvalidOperationException("Failed to parse credentials from JSON string", ex);
                    }
                }
                else
                {
                    // Fall back to credentials file
                    string credentialsPath = Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS");
                    _logger.LogInformation($"GOOGLE_APPLICATION_CREDENTIALS path: {credentialsPath}");
                    
                    if (string.IsNullOrEmpty(credentialsPath))
                    {
                        throw new InvalidOperationException("Neither GOOGLE_APPLICATION_CREDENTIALS_JSON nor GOOGLE_APPLICATION_CREDENTIALS is set");
                    }

                    try
                    {
                        _logger.LogInformation($"Attempting to load credentials from file: {credentialsPath}");
                        credential = GoogleCredential.FromFile(credentialsPath);
                        _logger.LogInformation("Successfully loaded credentials from file");
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, $"Failed to load credentials from file: {credentialsPath}");
                        throw new InvalidOperationException($"Failed to load credentials from file: {credentialsPath}", ex);
                    }
                }

                try
                {
                    _logger.LogInformation("Attempting to create Firestore client");
                    _firestoreDb = new FirestoreDbBuilder
                    {
                        ProjectId = projectId,
                        Credential = credential
                    }.Build();
                    _logger.LogInformation("Firestore client created successfully");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to create Firestore client");
                    throw new InvalidOperationException("Failed to create Firestore client", ex);
                }

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