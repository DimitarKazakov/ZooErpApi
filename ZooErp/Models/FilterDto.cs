using System;
namespace ZooErp.Models
{
	public class FilterDto
	{
        public int? Id { get; set; }

        public int? Skip { get; set; }

        public int? Take { get; set; }

        public string? CreatedOnDate { get; set; }

        public string? LastModifiedOnDate { get; set; }
    }
}

