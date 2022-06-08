using System;
using System.ComponentModel.DataAnnotations;

namespace ZooErp.Models
{
	public class CreateFoodDto
	{
        [Range(1.5, 1000000)]
        public decimal Price { get; set; }

        [Range(1.5, 10000)]
        public double Colories { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [StringLength(500)]
        public string ImageUrl { get; set; }

        [StringLength(20)]
        public string Name { get; set; }

        public int UsageType { get; set; }

        public int Type { get; set; }

        public IEnumerable<int> AnimalIds { get; set; }
    }
}

