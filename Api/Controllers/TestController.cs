// Controllers/TestController.cs
using Microsoft.AspNetCore.Mvc;
using Google.Cloud.Firestore;
using Api.Services;
using Api.Models;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly FirestoreService _firestoreService;
        private readonly ILogger<TestController> _logger;
        private const string CollectionName = "job_applications";

        public TestController(FirestoreService firestoreService, ILogger<TestController> logger)
        {
            _firestoreService = firestoreService;
            _logger = logger;
        }

        [HttpGet("firestore-connection")]
        public async Task<IActionResult> TestConnection()
        {
            try
            {
                // Try to get a reference to the collection
                var db = _firestoreService.GetFirestoreDb();
                var collectionRef = db.Collection(CollectionName);
                
                // Attempt to read from the collection to verify connection
                var snapshot = await collectionRef.Limit(1).GetSnapshotAsync();
                
                return Ok(new { 
                    message = "Successfully connected to Firestore",
                    projectId = db.ProjectId,
                    documentsFound = snapshot.Count
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to connect to Firestore");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost("add-test-data")]
        public async Task<IActionResult> AddTestData()
        {
            try
            {
                var db = _firestoreService.GetFirestoreDb();
                
                // Create a sample job application
                var jobApp = new JobApplication
                {
                    Company = "Test Company",
                    Position = "Software Developer",
                    Status = "Applied"
                };
                
                // Add to Firestore
                var docRef = await db.Collection(CollectionName).AddAsync(jobApp);
                
                return Ok(new { 
                    message = "Test document added successfully",
                    documentId = docRef.Id
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to add test data");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var db = _firestoreService.GetFirestoreDb();
                var snapshot = await db.Collection(CollectionName).GetSnapshotAsync();
                
                var applications = snapshot.Documents
                    .Select(doc => doc.ConvertTo<JobApplication>())
                    .ToList();
                
                return Ok(applications);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to retrieve data");
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}