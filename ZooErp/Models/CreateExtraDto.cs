using System;
using System.ComponentModel.DataAnnotations;

namespace PuWeb.Models
{
	public class CreateExtraDto
	{
        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Range(0, 10000)]
        public decimal UsualPrice { get; set; }

        [Required]
        [StringLength(1000)]
        public string Description { get; set; }

        [Required]
        [StringLength(100)]
        public string Brand { get; set; }

        [Required]
        public string ImageUrl { get; set; }
    }
}

