﻿using System;
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

        public string Description { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public KingdomType KingdomType { get; set; }

        public short Age { get; set; }

        public GenderType Gender { get; set; }

        public decimal Price { get; set; }

        public ICollection<AnimalFood> AnimalFoods { get; set; }
	}
}

