using System;
namespace PuWeb.Models
{
	public class UpdateCarExtraDto
	{
        public int CarId { get; set; }

        public IEnumerable<int> ExtraIds { get; set; }
    }
}

