using System;
namespace ZooErp.Data.Entities
{
	public class AnimalFood: BaseModel
	{
		public AnimalFood()
		{
		}

        public int AnimalId { get; set; }

        public Animal Animal { get; set; }

        public int FoodId { get; set; }

        public Food Food { get; set; }

        public short Priority { get; set; }

        public int Quantity { get; set; }
    }
}

