using System;
using System.ComponentModel;

namespace ZooErp.Models.Enums
{
	public static class EnumExtensionMethods
	{
		public static string GetEnumDescription(this Enum value)
		{
			var fieldInfo = value.GetType().GetField(value.ToString());

			var descriptionAttributes = (DescriptionAttribute[])fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), false);

			return descriptionAttributes.Length > 0 ? descriptionAttributes[0].Description : value.ToString();
		}
	}
}

