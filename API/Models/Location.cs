using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessibleCity.API.Models
{
    public class Location
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        // Accessibility ratings (0-5 scores)
        public int AccessibilityForDisabled { get; set; } = 0;
        public int ComfortLevel { get; set; } = 0;
        public int NoiseLevel { get; set; } = 0;
        public int WifiQuality { get; set; } = 0;
        public int AirConditioningQuality { get; set; } = 0;

        // If added by a user (null if it's a built-in location)
        public string? AddedByUserId { get; set; }

        [ForeignKey("AddedByUserId")]
        public AppUser? AddedByUser { get; set; }

        // Timestamp
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
