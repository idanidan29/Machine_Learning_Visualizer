namespace FitSync.API.Models
{
    public class User
    {
        public int Id { get; set; }  
        public string Username { get; set; }  
        public string Email { get; set; }  
        public string PasswordHash { get; set; }  
        public string FullName { get; set; }  
        public DateTime DateJoined { get; set; }  
    }
}