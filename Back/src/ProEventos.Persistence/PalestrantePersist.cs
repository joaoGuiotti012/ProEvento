using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contexto;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence
{
    public class PalestrantePersist : IPalestrantePersist
    {
        private readonly ProEventosContext _context;
        public PalestrantePersist(ProEventosContext _context)
        {
            this._context = _context;

        } 
        public async Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                .Include(e => e.RedesSociais);

            if (includeEventos)
            {
                query = query.Include(e => e.PalestrantesEventos)
                    .ThenInclude(e => e.Evento);
            }

            query = query.OrderBy(e => e.Id);
            return await query.ToArrayAsync();
        }

        public async Task<Palestrante> GetAllPalestrantesByIdAsync(int PalestranteId, bool includeEventos)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
               .Include(e => e.RedesSociais);

            if (includeEventos)
            {
                query = query.Include(e => e.PalestrantesEventos)
                    .ThenInclude(e => e.Evento);
            }

            query = query.OrderBy(e => e.Id)
                .Where(e => e.Id == PalestranteId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Palestrante[]> GetAllPalestrantesByNameAsync(string Nome, bool includeEventos)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
               .Include(e => e.RedesSociais);

            if (includeEventos)
            {
                query = query.Include(e => e.PalestrantesEventos)
                    .ThenInclude(e => e.Evento);
            }

            query = query.OrderBy(e => e.Id)
                .Where( e => e.Nome.ToLower().Contains(Nome.ToLower()));

            return await query.ToArrayAsync();
        }

    }
}