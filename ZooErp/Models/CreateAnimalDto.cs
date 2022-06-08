using System;
using System.ComponentModel.DataAnnotations;

namespace ZooErp.Models
{
	public class CreateAnimalDto
	{
        public int CageId { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [StringLength(20)]
        public string Name { get; set; }

        [StringLength(500)]
        public string ImageUrl { get; set; }

        public int KingdomType { get; set; }

        [Range(1, 200)]
        public short Age { get; set; }

        public int Gender { get; set; }

        [Range(1.5, 1000000)]
        public decimal Price { get; set; }

        public IEnumerable<int> FoodIds { get; set; }
    }
}

