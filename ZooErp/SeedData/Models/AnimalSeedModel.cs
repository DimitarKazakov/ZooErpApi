using System;
using Newtonsoft.Json;
using ZooErp.Models.Enums;

namespace ZooErp.SeedData.Models
{
	public class AnimalSeedModel
	{
		[JsonProperty("name")]
		public string Name { get; set; }

		[JsonProperty("description")]
		public string Description { get; set; }

        [JsonProperty("imageUrl")]
        public string ImageUrl { get; set; }

        [JsonProperty("kingdomType")]
        public KingdomType KingdomType { get; set; }

        [JsonProperty("age")]
        public short Age { get; set; }

        [JsonProperty("gender")]
        public GenderType Gender { get; set; }

        [JsonProperty("price")]
        public decimal Price { get; set; }
    }
}

