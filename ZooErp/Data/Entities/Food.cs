using System;
using System.ComponentModel.DataAnnotations;
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

        [StringLength(500)]
        public string Description { get; set; }

        [StringLength(500)]
        public string ImageUrl { get; set; }

        [StringLength(20)]
        public string Name { get; set; }

        public UsageType UsageType { get; set; }

        public FoodType Type { get; set; }

        public ICollection<AnimalFood> AnimalFoods { get; set; }
    }
}

