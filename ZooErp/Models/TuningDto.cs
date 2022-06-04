using System;
namespace PuWeb.Models
{
	public class TuningDto
	{
        public int Id { get; set; }

        public string Name { get; set; }

        public string Function { get; set; }

        public string Brand { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public string CreatedOn { get; set; }

        public string CreatedBy { get; set; }

        public string LastModifiedOn { get; set; }

        public string LastModifiedBy { get; set; }

        public int NumberOfCars { get; set; }
    }
}

