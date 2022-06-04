using System;
namespace PuWeb.Models
{
	public class ColorDto
	{
		public ColorDto()
		{
		}

        public int Id { get; set; }

		public string Code { get; set; }

        public string CreatedOn { get; set; }

        public string CreatedBy { get; set; }

		public string LastModifiedOn { get; set; }

		public string LastModifiedBy { get; set; }

		public int NumberOfCars { get; set; }
	}
}

