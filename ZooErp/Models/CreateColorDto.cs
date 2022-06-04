using System;
using System.ComponentModel.DataAnnotations;

namespace PuWeb.Models
{
	public class CreateColorDto
	{
        [Required]
        [StringLength(10)]
        public string Code { get; set; }
    }
}