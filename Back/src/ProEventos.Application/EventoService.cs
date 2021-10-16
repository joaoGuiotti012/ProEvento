using System;
using System.Threading.Tasks;
using ProEventos.Application.Contratos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
    public class EventoService : IEventoService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IEventosPersist _eventoPersist;
        public EventoService(IGeralPersist geralPersist, IEventosPersist eventoPersist)
        {
            this._geralPersist = geralPersist;
            this._eventoPersist = eventoPersist;
        }
        public async Task<Evento> Add(Evento model)
        {
            try
            {
                _geralPersist.Add<Evento>(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    return await _eventoPersist.GetAllEventosByIdAsync(model.Id, false);
                }
                return null;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento> Update(int eventoId, Evento model)
        {
            try
            {
                var evento = await _eventoPersist.GetAllEventosByIdAsync(eventoId, false);

                if (evento == null) return null;

                _geralPersist.Update(model);

                if (await _geralPersist.SaveChangesAsync())
                {
                    return await _eventoPersist.GetAllEventosByIdAsync(eventoId, false);
                }
                return null;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<bool> Delete(int eventoId)
        {
            try
            {
                var evento = await _eventoPersist.GetAllEventosByIdAsync(eventoId, false);

                if (evento == null) throw new Exception("Evento não encontrado!");

                _geralPersist.Delete<Evento>(evento);

                return await _geralPersist.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes)
        {
            try
            {
                return await _eventoPersist.GetAllEventosAsync(includePalestrantes);
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento> GetAllEventosByIdAsync(int EventoId, bool includePalestrantes)
        {
            try
            {
                var evento = await _eventoPersist.GetAllEventosByIdAsync(EventoId, includePalestrantes);
                return evento;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes)
        {
            try
            {
                var evento = await _eventoPersist.GetAllEventosByTemaAsync(tema, includePalestrantes);
                return evento;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
