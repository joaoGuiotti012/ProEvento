using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
    public class EventoService : IEventoService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IEventosPersist _eventoPersist;

        private readonly IMapper _mapper;
        public EventoService(IGeralPersist geralPersist, IEventosPersist eventoPersist, IMapper mapper)
        {
            _geralPersist = geralPersist;
            _eventoPersist = eventoPersist;
            _mapper = mapper;
        }
        public async Task<bool> Add(EventoDto model)
        {
            try
            {
                _geralPersist.Add<Evento>(_mapper.Map<Evento>(model));
                return await _geralPersist.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto> Update(int eventoId, EventoDto model)
        {
            try
            {
                var evento = await _eventoPersist.GetAllEventosByIdAsync(eventoId, false);

                if (evento == null) return null;

                var idLotes = new List<int>();
                var idRedeSociais = new List<int>();

                model.Lotes.ForEach(item => idLotes.Add(item.Id));
                model.RedesSociais.ForEach(item => idRedeSociais.Add(item.Id));

                var lotes = evento.Lotes.Where(
                    lote => !idLotes.Contains(lote.Id)
                ).ToArray();

                var redeSociais = evento.RedesSociais.Where(
                    rede => !idRedeSociais.Contains(rede.Id)
                ).ToArray();

                if (lotes.Length > 0)
                    _geralPersist.DeleteRange(lotes);

                if (redeSociais.Length > 0)
                    _geralPersist.DeleteRange(redeSociais);

                _mapper.Map(model, evento);

                _geralPersist.Update(evento);

                if (await _geralPersist.SaveChangesAsync())
                {
                    return _mapper.Map<EventoDto>(
                        await _eventoPersist.GetAllEventosByIdAsync(eventoId, false)
                    );
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

        public async Task<EventoDto[]> GetAllEventosAsync(bool includePalestrantes)
        {
            try
            {
                var eventos = await _eventoPersist.GetAllEventosAsync(includePalestrantes);
                return _mapper.Map<EventoDto[]>(eventos);
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto> GetAllEventosByIdAsync(int EventoId, bool includePalestrantes)
        {
            try
            {
                var evento = await _eventoPersist.GetAllEventosByIdAsync(EventoId, includePalestrantes);
                return _mapper.Map<EventoDto>(evento);
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes)
        {
            try
            {
                var eventos = await _eventoPersist.GetAllEventosByTemaAsync(tema, includePalestrantes);
                return _mapper.Map<EventoDto[]>(eventos);
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
