using System;
using System.Globalization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZooErp.Models;
using ZooErp.Services;

namespace ZooErp.Controllers
{
	public class EventController: ApiControllerBase
	{
        private readonly EventService service;

        public EventController(EventService service)
		{
            this.service = service;
        }


        [HttpGet("[action]")]
        [Authorize]
        public async Task<IEnumerable<EventDto>> GetAllAsync()
            => await this.service.GetAsync(new FilterDto());

        [HttpGet("[action]/{id:int}")]
        [Authorize]
        public async Task<IEnumerable<EventDto>> GetByIdAsync([FromRoute] int id)
            => await this.service.GetAsync(new FilterDto() { Id = id });

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IEnumerable<EventDto>> GetWithCountAsync([FromQuery] int skip, [FromQuery] int take)
            => await this.service.GetAsync(new FilterDto() { Skip = skip, Take = take });

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IEnumerable<EventDto>> GetByDateAsync([FromQuery] string startDate)
            => await this.service.GetAsync(new FilterDto() { FilterDate = DateTime.ParseExact(startDate, "d/MM/yyyy", CultureInfo.InvariantCulture) });

        [HttpDelete("[action]/{id}")]
        [Authorize(Policy = "Administrator")]
        public async Task<bool> DeleteAsync([FromRoute] int id) => await this.service.DeleteAsync(id);
    }
}

