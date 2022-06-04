
using System;
namespace PuWeb.Models
{
	public class BodyStyleDto
	{
		public BodyStyleDto()
		{
		}

        public int Id { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }

		public string CreatedOn { get; set; }

		public string CreatedBy { get; set; }

		public string LastModifiedOn { get; set; }

		public string LastModifiedBy { get; set; }

		public int NumberOfCars { get; set; }
	}
}

