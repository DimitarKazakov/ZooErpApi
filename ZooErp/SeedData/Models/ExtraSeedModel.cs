using System;
using Newtonsoft.Json;

namespace PuWeb.SeedData.Models
{
	public class ExtraSeedModel
	{
		[JsonProperty("name")]
		public string Name { get; set; }

		[JsonProperty("description")]
		public string Description { get; set; }

		[JsonProperty("usualPrice")]
		public decimal UsualPrice { get; set; }

		[JsonProperty("brand")]
		public string Brand { get; set; }

		[JsonProperty("imageUrl")]
		public string ImageUrl { get; set; }
	}
}

