using System;
using System.ComponentModel.DataAnnotations;
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

        [StringLength(20)]
        public string Name { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [StringLength(500)]
        public string ImageUrl { get; set; }

        [StringLength(50)]
        public string Location { get; set; }

        public float Rating { get; set; }

        public CageType Type { get; set; }

        public ICollection<Event> Events { get; set; }

        public ICollection<Animal> Animals { get; set; }
    }
}

