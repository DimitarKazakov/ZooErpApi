using System;
namespace PuWeb.Models
{
	public class CarMakeDto
	{
        public int Id { get; set; }

        public string Name { get; set; }

        public string FullName { get; set; }

        public string ImageUrl { get; set; }

        public string Description { get; set; }

        public string FoundedIn { get; set; }

        public string FoundedBy { get; set; }

        public string Headquarters { get; set; }

        public string CreatedOn { get; set; }

        public string CreatedBy { get; set; }

        public string LastModifiedOn { get; set; }

        public string LastModifiedBy { get; set; }

        public int NumberOfCars { get; set; }
    }
}

