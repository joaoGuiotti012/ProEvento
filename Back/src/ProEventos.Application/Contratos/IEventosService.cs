using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Application.Contratos
{
    public interface IEventoService
    {
        Task<Evento> Add(Evento model);
        Task<Evento> Update(int eventoId, Evento model);
        Task<bool> Delete(int eventoId);

        Task<Evento[]> GetAllEventosAsync(bool includePalestrantes);
        Task<Evento> GetAllEventosByIdAsync(int EventoId, bool includePalestrantes);
        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes);
    }
}