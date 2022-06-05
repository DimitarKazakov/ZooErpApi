using System;
using Newtonsoft.Json;
using ZooErp.Models.Enums;

namespace ZooErp.SeedData.Models
{
	public class CageSeedModel
	{
        [JsonProperty("capacity")]
        public int Capacity { get; set; }

        [JsonProperty("area")]
        public double Area { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("imageUrl")]
        public string ImageUrl { get; set; }

        [JsonProperty("location")]
        public string Location { get; set; }

        [JsonProperty("rating")]
        public float Rating { get; set; }

        [JsonProperty("type")]
        public CageType Type { get; set; }

    }
}

