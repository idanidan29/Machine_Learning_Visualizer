using Microsoft.EntityFrameworkCore;
using FitSync.API.Models;

namespace FitSync.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        // public DbSet<Workout> Workouts { get; set; }
        // public DbSet<Friend> Friends { get; set; }
    }
}
