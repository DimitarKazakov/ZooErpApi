using System;
namespace ZooErp.Models
{
	public class AnimalDto: BaseModelDto
	{
        public string Description { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string KingdomType { get; set; }

        public short Age { get; set; }

        public string Gender { get; set; }

        public decimal Price { get; set; }

        public int CageId { get; set; }

        public string Cage { get; set; }

        public int NumberOfFoods { get; set; }

        public IEnumerable<string> Foods { get; set; }
    }
}

