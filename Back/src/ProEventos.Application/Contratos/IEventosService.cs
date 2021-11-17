using System.Threading.Tasks;
using ProEventos.Application.Dtos;
using ProEventos.Domain;

namespace ProEventos.Application.Contratos
{
    public interface IEventoService
    {
        Task<bool> Add(EventoDto model);
        Task<EventoDto> Update(int eventoId, EventoDto model);
        Task<bool> Delete(int eventoId);

        Task<EventoDto[]> GetAllEventosAsync(bool includePalestrantes);
        Task<EventoDto> GetAllEventosByIdAsync(int EventoId, bool includePalestrantes);
        Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes);
    }
}