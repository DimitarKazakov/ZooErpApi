using System;
namespace ZooErp.Models
{
	public class BaseModelDto
	{
        public int Id { get; set; }

		public string CreatedOn { get; set; }

		public string LastModifiedOn { get; set; }

		public string CreatedBy { get; set; }

		public string LastModifiedBy { get; set; }
	}
}

