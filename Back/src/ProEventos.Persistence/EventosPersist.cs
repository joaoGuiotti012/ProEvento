using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;
using ProEventos.Persistence.Contexto;

namespace ProEventos.Persistence
{
    public class EventosPersist : IEventosPersist
    {
        private readonly ProEventosContext _context;
        public EventosPersist(ProEventosContext _context)
        {
            this._context = _context;

            // Não segura o processo 
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;

        }
        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes)
        {
            IQueryable<Evento> query = _context.Eventos
                .Include(e => e.Lotes)
                .Include(e => e.RedesSociais);

            if (includePalestrantes)
            {
                query = query
                    .Include(e => e.PalestrantesEventos)
                    .ThenInclude(e => e.Palestrante);
            }

            query = query.AsNoTracking()
                         .OrderBy(e => e.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Evento> GetAllEventosByIdAsync(int EventoId, bool includePalestrantes)
        {
            IQueryable<Evento> query = _context.Eventos
              .Include(e => e.Lotes)
              .Include(e => e.RedesSociais);

            if (includePalestrantes)
            {
                query = query
                    .Include(e => e.PalestrantesEventos)
                    .ThenInclude(e => e.Palestrante);
            }

            query = query.AsNoTracking()
                .OrderBy(e => e.Id)
                .Where(e => e.Id == EventoId);

            return await query.SingleOrDefaultAsync();
        }

        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes)
        {
            IQueryable<Evento> query = _context.Eventos
              .Include(e => e.Lotes)
              .Include(e => e.RedesSociais);

            if (includePalestrantes)
            {
                query = query
                    .Include(e => e.PalestrantesEventos)
                    .ThenInclude(e => e.Palestrante);
            }

            query = query.AsNoTracking()
                .OrderBy(e => e.Id)
                .Where(e => e.Tema.ToLower().Contains(tema.ToLower()));

            return await query.ToArrayAsync();
        }

    }
}