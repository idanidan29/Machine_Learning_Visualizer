using Google.Cloud.Firestore;

namespace JobTrackerApi.Models
{
    [FirestoreData]
    public class JobApplication
    {
        [FirestoreDocumentId]
        public string Id { get; set; } = string.Empty;
        
        [FirestoreProperty("company")]
        public string Company { get; set; } = string.Empty;
        
        [FirestoreProperty("position")]
        public string Position { get; set; } = string.Empty;
        
        [FirestoreProperty("status")]
        public string Status { get; set; } = string.Empty;
    }
}