using System;
namespace PuWeb.Models
{
	public class ConditionDto
	{
        public int Id { get; set; }

        public string Name { get; set; }

		public string Reason { get; set; }

		public string Explanation { get; set; }

		public string CreatedOn { get; set; }

		public string CreatedBy { get; set; }

		public string LastModifiedOn { get; set; }

		public string LastModifiedBy { get; set; }

		public int NumberOfCars { get; set; } 
	}
}

