using System;
namespace ZooErp.Models
{
	public class FilterDto
	{
        public int? Id { get; set; }

        public int? Skip { get; set; }

        public int? Take { get; set; }

        public DateTime? FilterDate { get; set; }
    }
}

