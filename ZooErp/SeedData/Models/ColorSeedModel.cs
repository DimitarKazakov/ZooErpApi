using System;
using Newtonsoft.Json;

namespace PuWeb.SeedData.Models
{
	public class ColorSeedModel
	{
		[JsonProperty("code")]
        public string Code { get; set; }
    }
}

