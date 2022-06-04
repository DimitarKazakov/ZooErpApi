using System;
using System.ComponentModel.DataAnnotations;

namespace PuWeb.Models
{
	public class CreateCarMakeDto
	{
		[Required]
		[StringLength(100)]
		public string Name { get; set; }

		[Required]
		[StringLength(100)]
		public string FullName { get; set; }

		[Required]
		public string ImageUrl { get; set; }

		[Required]
		[StringLength(1000)]
		public string Description { get; set; }

		[Required]
		[StringLength(20)]
		public string FoundedIn { get; set; }

		[Required]
		[StringLength(100)]
		public string FoundedBy { get; set; }

		[Required]
		[StringLength(100)]
		public string Headquarters { get; set; }
	}
}

