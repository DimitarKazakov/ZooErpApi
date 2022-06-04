using System;
using System.ComponentModel.DataAnnotations;

namespace PuWeb.Models
{
	public class CreateTuningDto
	{
        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(100)]
        public string Function { get; set; }

        [Required]
        [StringLength(100)]
        public string Brand { get; set; }

        [Required]
        [StringLength(1000)]
        public string Description { get; set; }

        [Required]
        public string ImageUrl { get; set; }
    }
}

