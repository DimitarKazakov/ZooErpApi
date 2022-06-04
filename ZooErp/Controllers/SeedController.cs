using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PuWeb.Data;
using PuWeb.Services;

namespace PuWeb.Controllers
{
    public class SeederController : ApiControllerBase
    {
        private readonly SeedService seedService;

        public SeederController(SeedService seedService)
        {
            this.seedService = seedService;
        }

        [HttpPost("[action]")]
        [Authorize(Policy = "Administrator")]
        public async Task<int> SeedFuelTypesAsync() => await this.seedService.SeedFuelTypesAsync();

        [HttpPost("[action]")]
        [Authorize(Policy = "Administrator")]
        public async Task<int> SeedBodyStylesAsync() => await this.seedService.SeedBodyStylesAsync();

        [HttpPost("[action]")]
        [Authorize(Policy = "Administrator")]
        public async Task<int> SeedColorsAsync() => await this.seedService.SeedColorsAsync();

        [HttpPost("[action]")]
        [Authorize(Policy = "Administrator")]
        public async Task<int> SeedCarLevelsAsync() => await this.seedService.SeedCarLevelsAsync();

        [HttpPost("[action]")]
        [Authorize(Policy = "Administrator")]
        public async Task<int> SeedCarMakesAsync() => await this.seedService.SeedCarMakesAsync();

        [HttpPost("[action]")]
        [Authorize(Policy = "Administrator")]
        public async Task<int> SeedConditionsAsync() => await this.seedService.SeedConditionsAsync();

        [HttpPost("[action]")]
        [Authorize(Policy = "Administrator")]
        public async Task<int> SeedExtrasAsync() => await this.seedService.SeedExtrasAsync();

        [HttpPost("[action]")]
        [Authorize(Policy = "Administrator")]
        public async Task<int> SeedTunningsAsync() => await this.seedService.SeedTunningsAsync();
    }
}

