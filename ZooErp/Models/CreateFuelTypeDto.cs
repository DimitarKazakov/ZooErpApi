using System.ComponentModel.DataAnnotations;

namespace PuWeb.Models
{
	public class CreateFuelTypeDto
	{
		[Required]
		[StringLength(100)]
		public string Fuel { get; set; }

		[Range(0, 10)]
		public decimal CurrentPrice { get; set; }
	}
}

