using System;
using System.ComponentModel;

namespace ZooErp.Models.Enums
{
	public enum FoodType
	{
		[Description("Fruit")]
		Fruit = 1,

		[Description("Vegetables")]
		Vegetables = 2,

		[Description("Starchy Food")]
		Starchy = 3,

		[Description("Dairy Food")]
		Dairy = 4,

		[Description("Meat")]
		Meat = 5,

		[Description("Fish")]
		Fish = 6,

		[Description("Insects")]
		Insects = 7,

		[Description("Plants")]
		Plants = 8,

		[Description("Junk Food")]
		Junk = 9,

		[Description("Fatty Food")]
		Fatty = 10
	}
}

