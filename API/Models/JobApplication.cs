using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using JobTracker.Api.Models;
public class JobApplication
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        [Required]
        public Guid CompanyId { get; set; }

        public string Company { get; set; }

        [Required]
        [MaxLength(200)]
        public string Position { get; set; }

        [Required]
        public ApplicationStatus Status { get; set; } = ApplicationStatus.Applied;

        [Required]
        public DateTime AppliedDate { get; set; } = DateTime.UtcNow;

        public string Notes { get; set; }
    }

    public enum ApplicationStatus
    {
        Applied,
        Interview,
        Offer,
        Rejected
    }