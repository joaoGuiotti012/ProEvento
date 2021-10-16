using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface IPalestrantePersist 
    {
        // PALESTRANTES
        Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos);
        Task<Palestrante> GetAllPalestrantesByIdAsync(int PalestranteId, bool includeEventos);
        Task<Palestrante[]> GetAllPalestrantesByNameAsync(string Nome, bool includeEventos);

    }
}