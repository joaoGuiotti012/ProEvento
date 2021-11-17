using System;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ProEventos.API.identity;

namespace ProEventos.Persistence.Contexto
{
    public class ProEventosContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>,
                                                    UserRole, IdentityUserLogin<int>,
                                                    IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public ProEventosContext(DbContextOptions<ProEventosContext> options) : base(options)
        {

        }
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<RedeSocial> RedeSociais { get; set; }
        public DbSet<Palestrante> Palestrantes { get; set; }
        public DbSet<PalestranteEvento> PalestrantesEventos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(url => new { url.UserId, url.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();
               
                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            }); 

            modelBuilder.Entity<PalestranteEvento>()
                .HasKey(PE => new { PE.EventoId, PE.PalestranteId });

            // Configurando delete on cascade
            modelBuilder.Entity<Evento>()
                .HasMany(e => e.RedesSociais)
                .WithOne(rs => rs.Evento)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Palestrante>()
                .HasMany(e => e.RedesSociais)
                .WithOne(e => e.Palestrante)
                .OnDelete(DeleteBehavior.Cascade);


            // modelBuilder.Entity<Evento>()
            //     .HasData(
            //         new Evento
            //         {
            //             Tema = "Angualr + dotner core 5",
            //             Local = "Assis - SP",
            //             Lotes = new Lote[] {
            //                 new Lote {
            //                     Nome = "Angular 12 + ASP NET CORE EF 5 [2021]",
            //                     Preco = 22,
            //                     Qtd = 122,
            //                     DataInicio = DateTime.Now.AddDays(2),
            //                     DataFim = DateTime.Now.AddDays(3),
            //                     EventoId = 1
            //                 }
            //             },
            //             QtdPessoas = 250,
            //             DataEvento = DateTime.Now.AddDays(2),
            //             ImagemURL = "angular.png",
            //             RedesSociais = new RedeSocial[] {
            //                 new RedeSocial {
            //                     Nome = "fab fa-youtube",
            //                     URL = "http://fb.com"
            //                 }
            //             }
            //         },
            //         new Evento
            //         {
            //             Tema = "react Native",
            //             Local = "Lutecia - SP",
            //             Lotes = new Lote[] {
            //                 new Lote {
            //                     Id = 2,
            //                     Nome = "React Native [2021]",
            //                     Preco = 45,
            //                     Qtd = 322,
            //                     DataInicio = DateTime.Now.AddDays(4),
            //                     DataFim = DateTime.Now.AddDays(5)
            //                 }
            //             },
            //             QtdPessoas = 250,
            //             DataEvento = DateTime.Now.AddDays(2),
            //             ImagemURL = "react.png",
            //             RedesSociais = new RedeSocial[] {
            //                 new RedeSocial {
            //                     Nome = "fab fa-youtube",
            //                     URL = "http://fb.com"
            //                 }
            //             }
            //         }
            //     );
        }

    }
}