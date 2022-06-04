using System;
using ZooErp.Models.Enums;

namespace ZooErp.Data.Entities
{
	public class Food: BaseModel
	{
		public Food()
		{
			this.AnimalFoods = new HashSet<AnimalFood>();
		}

        public decimal Price { get; set; }

        public double Colories { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public string Name { get; set; }

        public UsageType UsageType { get; set; }

        public FoodType Type { get; set; }

        public ICollection<AnimalFood> AnimalFoods { get; set; }
    }
}

