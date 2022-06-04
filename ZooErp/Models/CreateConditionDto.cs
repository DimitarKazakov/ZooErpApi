using System;
using System.ComponentModel.DataAnnotations;

namespace PuWeb.Models
{
	public class CreateConditionDto
	{
		[Required]
		[StringLength(100)]
		public string Name { get; set; }

		[Required]
		[StringLength(100)]
		public string Reason { get; set; }

		[Required]
		[StringLength(1000)]
		public string Explanation { get; set; }
	}
}

