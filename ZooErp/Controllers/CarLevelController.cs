using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PuWeb.Models;
using PuWeb.Services;

namespace PuWeb.Controllers
{
	public class CarLevelController: ApiControllerBase
    {
        private readonly CarLevelService service;

        public CarLevelController(CarLevelService service)
		{
            this.service = service;
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IEnumerable<CarLevelDto>> GetAllAsync() => await this.service.GetAllAsync();

        [HttpGet("[action]/{id}")]
        [Authorize]
        public async Task<CarLevelDto> GetByIdAsync([FromRoute] int id) => await this.service.GetByIdAsync(id);

        [HttpPut("[action]/{id}")]
        [Authorize(Policy = "Administrator")]
        public async Task<bool> UpdateAsync([FromRoute] int id, [FromBody] CreateCarLevelDto data, [FromHeader] string authorization) => await this.service.UpdateAsync(data, id, authorization);

        [HttpPost("[action]")]
        [Authorize(Policy = "Administrator")]
        public async Task<bool> CreateAsync([FromBody] CreateCarLevelDto data, [FromHeader] string authorization) => await this.service.CreateAsync(data, authorization);

        [HttpDelete("[action]/{id}")]
        [Authorize(Policy = "Administrator")]
        public async Task<bool> DeleteAsync([FromRoute] int id) => await this.service.DeleteAsync(id);
    }
}

