using System;
namespace PuWeb.Models
{
	public class UpdateCarTuningDto
	{
        public int CarId { get; set; }

        public IEnumerable<int> TuningIds { get; set; }
    }
}

