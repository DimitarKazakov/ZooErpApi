using System;
using ZooErp.Models.Enums;

namespace ZooErp.Data.Entities
{
	public class Cage: BaseModel
	{
		public Cage()
		{
			this.Events = new HashSet<Event>();
            this.Animals = new HashSet<Animal>();
		}

        public int Capacity { get; set; }

        public double Area { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public string Location { get; set; }

        public float Rating { get; set; }

        public CageType Type { get; set; }

        public ICollection<Event> Events { get; set; }

        public ICollection<Animal> Animals { get; set; }
    }
}

