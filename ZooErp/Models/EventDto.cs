using System;
namespace ZooErp.Models
{
	public class EventDto: BaseModelDto
	{
        public int CageId { get; set; }

        public string Cage { get; set; }

        public string Type { get; set; }

        public string Description { get; set; }
    }
}

