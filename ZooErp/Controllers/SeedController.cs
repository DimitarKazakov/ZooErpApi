using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZooErp.Services;

namespace ZooErp.Controllers
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
        public async Task<int> SeedAnimalsAsync() => await this.seedService.SeedAnimalsAsync();

        [HttpPost("[action]")]
        [Authorize(Policy = "Administrator")]
        public async Task<int> SeedCagesAsync() => await this.seedService.SeedCagesAsync();

        [HttpPost("[action]")]
        [Authorize(Policy = "Administrator")]
        public async Task<int> SeedFoodsAsync() => await this.seedService.SeedFoodsAsync();

        [HttpPost("[action]")]
        [Authorize(Policy = "Administrator")]
        public async Task<int> SeedEventsAsync() => await this.seedService.SeedEventsAsync();

        [HttpPost("[action]")]
        [Authorize(Policy = "Administrator")]
        public async Task<bool> SeedAllDataAsync()
        {
            await this.seedService.SeedCagesAsync();
            await this.seedService.SeedFoodsAsync();
            await this.seedService.SeedEventsAsync();
            await this.seedService.SeedAnimalsAsync();
            return true;
        }
    }
}

