using Microsoft.AspNetCore.Identity;

namespace ProEventos.API.identity
{
    public class UserRole: IdentityUserRole<int>
    {
        public User User { get; set; }
        
        public Role Role { get; set; }
        
        
    }
}