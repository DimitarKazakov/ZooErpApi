using System;
using Newtonsoft.Json;

namespace PuWeb.SeedData.Models
{
	public class CarMakeSeedModel
	{
		public CarMakeSeedModel()
		{
		}

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("fullName")]
        public string FullName { get; set; }

        [JsonProperty("imageUrl")]
        public string ImageUrl { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("foundedIn")]
        public string FoundedIn { get; set; }

        [JsonProperty("foundedBy")]
        public string FoundedBy { get; set; }

        [JsonProperty("headquarters")]
        public string Headquarters { get; set; }
    }
}

