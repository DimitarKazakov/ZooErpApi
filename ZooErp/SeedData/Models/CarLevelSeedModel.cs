using System;
using Newtonsoft.Json;

namespace PuWeb.SeedData.Models
{
	public class CarLevelSeedModel
	{
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}

