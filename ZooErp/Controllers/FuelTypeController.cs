using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PuWeb.Models;
using PuWeb.Services;

namespace PuWeb.Controllers
{
	public class FuelTypeController: ApiControllerBase
    {
        private readonly FuelTypesService service;

        public FuelTypeController(FuelTypesService service)
		{
            this.service = service;
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IEnumerable<FuelTypeDto>> GetAllAsync() => await this.service.GetAllAsync();

        [HttpGet("[action]/{id}")]
        [Authorize]
        public async Task<FuelTypeDto> GetByIdAsync([FromRoute] int id) => await this.service.GetByIdAsync(id);

        [HttpPut("[action]/{id}")]
        [Authorize(Policy = "Administrator")]
        public async Task<bool> UpdateAsync([FromRoute] int id, [FromBody] CreateFuelTypeDto data, [FromHeader] string authorization) => await this.service.UpdateAsync(data, id, authorization);

        [HttpPost("[action]")]
        [Authorize(Policy = "Administrator")]
        public async Task<bool> CreateAsync([FromBody] CreateFuelTypeDto data, [FromHeader] string authorization) => await this.service.CreateAsync(data, authorization);

        [HttpDelete("[action]/{id}")]
        [Authorize(Policy = "Administrator")]
        public async Task<bool> DeleteAsync([FromRoute] int id) => await this.service.DeleteAsync(id);
    }
}

