using System;
namespace ZooErp.Models
{
	public class CreateEventDto
	{
		public int CageId { get; set; }

		public int Type { get; set; }

		public string Description { get; set; }
	}
}

