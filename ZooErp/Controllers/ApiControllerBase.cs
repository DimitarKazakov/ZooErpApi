using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ZooErp.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class ApiControllerBase : ControllerBase
    {
    }
}

