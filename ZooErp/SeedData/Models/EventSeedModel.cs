using System;
using Newtonsoft.Json;
using ZooErp.Models.Enums;

namespace ZooErp.SeedData.Models
{
	public class EventSeedModel
	{
		[JsonProperty("type")]
		public EventType Type { get; set; }

		[JsonProperty("description")]
		public string Description { get; set; }
	}
}

