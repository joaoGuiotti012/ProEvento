using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface IEventosPersist
    {
        // EVENTOS
        Task<Evento[]> GetAllEventosAsync(bool includePalestrantes);
        Task<Evento> GetAllEventosByIdAsync(int EventoId, bool includePalestrantes);
        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes);

    }
}