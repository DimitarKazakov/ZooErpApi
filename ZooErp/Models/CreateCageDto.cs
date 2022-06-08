using System;
using System.ComponentModel.DataAnnotations;

namespace ZooErp.Models
{
	public class CreateCageDto
	{
        [Range(1, 200)]
        public int Capacity { get; set; }

        [Range(1.5, 5000)]
        public double Area { get; set; }

        [StringLength(20)]
        public string Name { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [StringLength(500)]
        public string ImageUrl { get; set; }

        [StringLength(50)]
        public string Location { get; set; }

        [Range(1, 6)]
        public float Rating { get; set; }

        public int Type { get; set; }
    }
}

