using System;
using Newtonsoft.Json;

namespace PuWeb.SeedData.Models
{
	public class FuelTypeSeedModel
	{
		[JsonProperty("fuel")]
        public string Fuel { get; set; }

		[JsonProperty("currentPrice")]
		public decimal CurrentPrice { get; set; }
    }
}

