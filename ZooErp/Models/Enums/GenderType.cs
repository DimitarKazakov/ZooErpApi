using System;
using System.ComponentModel;

namespace ZooErp.Models.Enums
{
	public enum GenderType
	{
		[Description("Male")]
		Male = 1,

		[Description("Female")]
		Female = 2,

		[Description("Other Gender")]
		Other = 3
	}
}

