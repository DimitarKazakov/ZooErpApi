using System;
namespace ZooErp.Models
{
	public class FoodDto: BaseModelDto
    {
        public decimal Price { get; set; }

        public double Colories { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public int Quantity { get; set; }

        public string Name { get; set; }

        public string UsageType { get; set; }

        public int UsageTypeId { get; set; }

        public string Type { get; set; }

        public int TypeId { get; set; }

        public int NumberOfAnimals { get; set; }

        public IEnumerable<string> Animals { get; set; }
    }
}

