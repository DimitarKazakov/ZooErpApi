using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PuWeb.Models;
using PuWeb.Services;

namespace PuWeb.Controllers
{
	public class CarController: ApiControllerBase
	{
        private readonly CarService service;

        public CarController(CarService service)
        {
            this.service = service;
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IEnumerable<CarDto>> GetAllAsync() => await this.service.GetAllAsync();

        [HttpGet("[action]/{id}")]
        [Authorize]
        public async Task<CarDto> GetByIdAsync([FromRoute] int id) => await this.service.GetByIdAsync(id);

        [HttpPut("[action]/{id}")]
        [Authorize(Policy = "Administrator")]
        public async Task<bool> UpdateAsync([FromRoute] int id, [FromBody] CreateCarDto data, [FromHeader] string authorization) => await this.service.UpdateAsync(data, id, authorization);

        [HttpPost("[action]")]
        [Authorize(Policy = "Administrator")]
        public async Task<bool> CreateAsync([FromBody] CreateCarDto data, [FromHeader] string authorization) => await this.service.CreateAsync(data, authorization);

        [HttpDelete("[action]/{id}")]
        [Authorize(Policy = "Administrator")]
        public async Task<bool> DeleteAsync([FromRoute] int id) => await this.service.DeleteAsync(id);

        [HttpPost("[action]")]
        [Authorize(Policy = "Administrator")]
        public async Task<bool> UpdateExtraAsync([FromBody] UpdateCarExtraDto data, [FromHeader] string authorization) => await this.service.UpdateExtraAsync(data, authorization);

        [HttpPost("[action]")]
        [Authorize(Policy = "Administrator")]
        public async Task<bool> UpdateTunningAsync([FromBody] UpdateCarTuningDto data, [FromHeader] string authorization) => await this.service.UpdateTunningAsync(data, authorization);
    }
}

