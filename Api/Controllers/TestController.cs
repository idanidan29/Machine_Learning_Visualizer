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
    }
}