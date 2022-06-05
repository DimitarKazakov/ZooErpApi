using System;
using Newtonsoft.Json;
using ZooErp.Models.Enums;

namespace ZooErp.SeedData.Models
{
	public class FoodSeedModel
	{
        [JsonProperty("price")]
        public decimal Price { get; set; }

        [JsonProperty("colories")]
        public double Colories { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("imageUrl")]
        public string ImageUrl { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("usageType")]
        public UsageType UsageType { get; set; }

        [JsonProperty("type")]
        public FoodType Type { get; set; }
    }
}

