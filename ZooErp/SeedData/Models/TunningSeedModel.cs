using System;
using Newtonsoft.Json;

namespace PuWeb.SeedData.Models
{
	public class TunningSeedModel
	{
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("function")]
        public string Function { get; set; }

        [JsonProperty("brand")]
        public string Brand { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("imageUrl")]
        public string ImageUrl { get; set; }
    }
}

