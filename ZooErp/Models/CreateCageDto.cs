using System;
namespace ZooErp.Models
{
	public class CreateCageDto
	{
        public int Capacity { get; set; }

        public double Area { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public string Location { get; set; }

        public float Rating { get; set; }

        public int Type { get; set; }
    }
}

