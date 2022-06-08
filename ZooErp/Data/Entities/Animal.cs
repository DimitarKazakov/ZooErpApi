using System;
using System.ComponentModel.DataAnnotations;
using ZooErp.Models.Enums;

namespace ZooErp.Data.Entities
{
	public class Animal: BaseModel
	{
		public Animal()
		{
			this.AnimalFoods = new HashSet<AnimalFood>();
		}

        public int CageId { get; set; }

        public Cage Cage { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [StringLength(20)]
        public string Name { get; set; }

        [StringLength(500)]
        public string ImageUrl { get; set; }

        public KingdomType KingdomType { get; set; }

        public short Age { get; set; }

        public GenderType Gender { get; set; }

        public decimal Price { get; set; }

        public ICollection<AnimalFood> AnimalFoods { get; set; }
	}
}

