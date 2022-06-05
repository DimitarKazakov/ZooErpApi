using System;
namespace ZooErp.Models
{
	public class CreateFoodDto
	{
        public decimal Price { get; set; }

        public double Colories { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public string Name { get; set; }

        public int UsageType { get; set; }

        public int Type { get; set; }

        public IEnumerable<int> AnimalIds { get; set; }
    }
}

