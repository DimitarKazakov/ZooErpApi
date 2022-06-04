using System;
using Newtonsoft.Json;

namespace PuWeb.SeedData.Models
{
	public class ConditionSeedModel
	{
		[JsonProperty("name")]
		public string Name { get; set; }

		[JsonProperty("reason")]
		public string Reason { get; set; }

		[JsonProperty("explanation")]
		public string Explanation { get; set; }
	}
}

