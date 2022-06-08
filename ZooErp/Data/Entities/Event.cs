using System;
using System.ComponentModel.DataAnnotations;
using ZooErp.Models.Enums;

namespace ZooErp.Data.Entities
{
	public class Event: BaseModel
	{
        public int CageId { get; set; }

        public Cage Cage { get; set; }

        public EventType Type { get; set; }

        [StringLength(500)]
        public string Description { get; set; }
    }
}

