using System;
namespace PuWeb.Models
{
	public class FuelTypeDto
	{
        public int Id { get; set; }

		public string Fuel { get; set; }

		public decimal CurrentPrice { get; set; }

		public string CreatedOn { get; set; }

		public string CreatedBy { get; set; }

		public string LastModifiedOn { get; set; }

		public string LastModifiedBy { get; set; }

		public int NumberOfCars { get; set; }
    }
}

