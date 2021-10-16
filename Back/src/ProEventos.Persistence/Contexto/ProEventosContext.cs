using System;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contexto
{
    public class ProEventosContext : DbContext
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
            modelBuilder.Entity<PalestranteEvento>()
                .HasKey(PE => new { PE.EventoId, PE.PalestranteId });
           

            // modelBuilder.Entity<Evento>()
            //     .HasData(
            //         new Evento
            //         {
            //             Id = 1,
            //             Tema = "Angualr + dotner core 5",
            //             Local = "Assis - SP",
            //             Lote = new Lote[] {
            //                 new Lote {
            //                     Id = 1,
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
            //             ImagemURL = "angular.png"
            //         },
            //         new Evento
            //         {
            //             Id = 2,
            //             Tema = "Angualr + dotner core 5",
            //             Local = "Assis - SP",
            //             Lote = new Lote[] {
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
            //             ImagemURL = "react.png"
            //         }
            //     );
        }

    }
}