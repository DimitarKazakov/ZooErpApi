using System;
namespace ZooErp.Models
{
	public class CageDto: BaseModelDto
	{
        public IEnumerable<AnimalDto> Animals { get; set; }

        public IEnumerable<EventDto> Events { get; set; }

        public int Capacity { get; set; }

        public double Area { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public string Location { get; set; }

        public float Rating { get; set; }

        public string Type { get; set; }

        public int TypeId { get; set; }
    }
}

