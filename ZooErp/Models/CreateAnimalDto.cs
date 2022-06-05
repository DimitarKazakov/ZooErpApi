using System;
namespace ZooErp.Models
{
	public class CreateAnimalDto
	{
        public int CageId { get; set; }

        public string Description { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public int KingdomType { get; set; }

        public short Age { get; set; }

        public int Gender { get; set; }

        public decimal Price { get; set; }

        public IEnumerable<int> FoodIds { get; set; }
    }
}

