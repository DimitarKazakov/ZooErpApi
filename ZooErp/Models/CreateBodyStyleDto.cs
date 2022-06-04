using System;
using System.ComponentModel.DataAnnotations;

namespace PuWeb.Models
{
	public class CreateBodyStyleDto
	{
        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(1000)]
        public string Description { get; set; }
    }
}

