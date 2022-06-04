using System;
using Newtonsoft.Json;

namespace PuWeb.SeedData.Models
{
	public class BodyStyleSeedModel
	{
		[JsonProperty("name")]
		public string Name { get; set; }

		[JsonProperty("description")]
		public string Description { get; set; }
	}
}

