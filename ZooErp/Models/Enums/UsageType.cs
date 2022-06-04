using System;
using System.ComponentModel;

namespace ZooErp.Models.Enums
{
	public enum UsageType
	{
		[Description("Main Food")]
		MainFood = 1,

		[Description("Breakfast")]
		Breakfast = 2,

		[Description("Dinner")]
		Dinner = 3,

		[Description("Lunch")]
		Lunch = 4,

		[Description("Medicine")]
		Medicine = 5,

		[Description("Diet")]
		Diet = 6,

		[Description("Snack")]
		Snack = 7,

		[Description("Training")]
		Training = 8,
	}
}

