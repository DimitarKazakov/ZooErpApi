using System;
using System.Globalization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZooErp.Models;
using ZooErp.Services;

namespace ZooErp.Controllers
{
	public class AnimalController: ApiControllerBase
	{
        private readonly AnimalService service;

        public AnimalController(AnimalService service)
		{
            this.service = service;
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IEnumerable<AnimalDto>> GetAllAsync()
            => await this.service.GetAsync(new FilterDto());

        [HttpGet("[action]/{id:int}")]
        [Authorize]
        public async Task<IEnumerable<AnimalDto>> GetByIdAsync([FromRoute] int id)
            => await this.service.GetAsync(new FilterDto() { Id = id });

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IEnumerable<AnimalDto>> GetWithCountAsync([FromQuery] int skip, [FromQuery] int take)
            => await this.service.GetAsync(new FilterDto() { Skip = skip, Take = take });

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IEnumerable<AnimalDto>> GetByDateAsync([FromQuery] string startDate)
            => await this.service.GetAsync(new FilterDto() { FilterDate = DateTime.ParseExact(startDate, "d/MM/yyyy", CultureInfo.InvariantCulture) });

        [HttpDelete("[action]/{id}")]
        [Authorize(Policy = "Administrator")]
        public async Task<bool> DeleteAsync([FromRoute] int id)
            => await this.service.DeleteAsync(id);

        [HttpPut("[action]/{id}")]
        [Authorize(Policy = "Administrator")]
        public async Task<bool> UpdateAsync([FromRoute] int id, [FromBody] CreateAnimalDto data, [FromHeader] string authorization)
            => await this.service.UpdateAsync(data, id, authorization);

        [HttpPost("[action]")]
        [Authorize(Policy = "Administrator")]
        public async Task<bool> CreateAsync([FromBody] CreateAnimalDto data, [FromHeader] string authorization)
            => await this.service.CreateAsync(data, authorization);

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IEnumerable<SelectDto>> GetOptionsAsync()
            => await this.service.GetOptions();
    }
}

