using System;
using ZooErp.Models.Enums;

namespace ZooErp.Data.Entities
{
	public class Event: BaseModel
	{
        public int CageId { get; set; }

        public Cage Cage { get; set; }

        public EventType Type { get; set; }

        public string Description { get; set; }
    }
}

