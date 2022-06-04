using System;
using System.ComponentModel;

namespace ZooErp.Models.Enums
{
	public enum EventType
	{
		[Description("Cage Created")]
		CageCreated = 1,

		[Description("Animal Added")]
		AnimalAdded = 2,

		[Description("Animal Removed")]
		AnimalRemoved = 3,

		[Description("Food Stock Empty")]
		FoodEmpty = 4,

		[Description("Food Restocked")]
		FoodRestock = 5,

		[Description("Cage Capacity At Max")]
		FullCage = 6,

		[Description("Animal Sold")]
		AnimalSold = 7,

		[Description("Waiting For Baby")]
		WaitingForBaby = 8
	}
}

