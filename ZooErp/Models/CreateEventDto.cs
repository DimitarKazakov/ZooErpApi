using System;
using System.ComponentModel.DataAnnotations;

namespace ZooErp.Models
{
	public class CreateEventDto
	{
		public int CageId { get; set; }

		public int Type { get; set; }

		[StringLength(500)]
		public string Description { get; set; }
	}
}

