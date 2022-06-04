using System;
using System.ComponentModel;

namespace ZooErp.Models.Enums
{
	public enum KingdomType
	{
		[Description("Mammal")]
		Mammal = 1,

		[Description("Bird")]
		Bird = 2,

		[Description("Reptiles")]
		Reptiles = 3,

		[Description("Amphibian")]
		Amphibian = 4,

		[Description("Insect")]
		Insect = 5,

		[Description("Fish")]
		Fish = 6,

		[Description("Hybrid")]
		Hybrid = 7,

		[Description("Ivertables")]
		Ivertables = 8,
	}
}

