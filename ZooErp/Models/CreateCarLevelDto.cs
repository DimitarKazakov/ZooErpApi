using System.ComponentModel.DataAnnotations;

namespace PuWeb.Models
{
	public class CreateCarLevelDto
	{
		[Required]
		[StringLength(100)]
		public string Name { get; set; }
	}
}

