using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PuWeb.Models;
using PuWeb.Services;

namespace PuWeb.Controllers
{
    public class AuthenticationController : ApiControllerBase
    {
        private readonly AuthenticationService service;

        public AuthenticationController(AuthenticationService service)
        {
            this.service = service;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<ActionResult<KeycloakResponse>> LogInAsync(
            [FromBody] LogInRequest request)
        {
            var result = await this.service.AuthenticateAsync(request);
            return result;
        }

        [Authorize]
        [HttpGet("[action]")]
        public async Task<UserInfoResponse> GetUserInfoAsync([FromHeader] string authorization)
        {
            return await this.service.GetUserInfoAsync(authorization);
        }

    }
}

