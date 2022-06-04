using System;
using System.ComponentModel.DataAnnotations;

namespace PuWeb.Models
{
	public class CreateCarDto
	{
        [Required]
        [StringLength(100)]
        public string Model { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public bool IsAutomatic { get; set; }

        [Range(10, 1500)]
        public int Power { get; set; }

        [Range(2, 10)]
        public int Doors { get; set; }

        public bool IsLeftSteering { get; set; }

        [Required]
        [StringLength(20)]
        public string Year { get; set; }

        [Range(0, 1000000)]
        public decimal Price { get; set; }

        [Range(0, 30)]
        public decimal Consumption { get; set; }

        [Range(500, 5000)]
        public decimal Weight { get; set; }

        [Range(1, 25)]
        public decimal Acceleration { get; set; }

        [Range(60, 500)]
        public decimal MaxSpeed { get; set; }

        public int ColorId { get; set; }

        public int BodyStyleId { get; set; }

        public int CarLevelId { get; set; }

        public int ConditionId { get; set; }

        public int FuelTypeId { get; set; }

        public int CarMakeId { get; set; }

        public IEnumerable<int> ExtraIds { get; set; }

        public IEnumerable<int> TunningIds { get; set; }
    }
}

