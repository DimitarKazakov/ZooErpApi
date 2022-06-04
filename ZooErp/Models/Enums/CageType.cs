using System;
using System.ComponentModel;

namespace ZooErp.Models.Enums
{
	public enum CageType
	{
        [Description("Mammals")]
		Mammals = 1,

        [Description("Birds")]
		Birds = 2,

		[Description("Aquarium")]
		Aquarium = 3,

		[Description("Terarium")]
		Terarium = 4,

		[Description("Box Cage")]
		Box = 5,

		[Description("Mesh Cage")]
		Mesh = 6,

		[Description("Steel Cage")]
		Steel = 7,

		[Description("Plastic Cage")]
		Plastic = 8,

		[Description("Open Space")]
		Open = 9,

		[Description("Natural Enclosure")]
		NaturalEnclosure = 10
	}
}

