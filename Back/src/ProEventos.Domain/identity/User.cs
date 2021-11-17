using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace ProEventos.API.identity
{
    public class User: IdentityUser<int>
    {
       [Column(TypeName = "varchar(150)")]
        public string FullName { get; set; }

        public List<UserRole> UserRoles { get; set; }
        
        
    }
}