using System;
namespace PuWeb.Models
{
	public class CarDto
	{
        public int Id { get; set; }

        public string Model { get; set; }

        public string ImageUrl { get; set; }

        public bool IsAutomatic { get; set; }

        public int Power { get; set; }

        public string CreatedOn { get; set; }

        public string CreatedBy { get; set; }

        public string LastModifiedOn { get; set; }

        public string LastModifiedBy { get; set; }

        public int Doors { get; set; }

        public bool IsLeftSteering { get; set; }

        public string Year { get; set; }

        public decimal Price { get; set; }

        public decimal Consumption { get; set; }

        public decimal Weight { get; set; }

        public decimal Acceleration { get; set; }

        public decimal MaxSpeed { get; set; }

        public ColorDto Color { get; set; }

        public BodyStyleDto BodyStyle { get; set; }

        public CarLevelDto CarLevel { get; set; }

        public ConditionDto Condition { get; set; }

        public FuelTypeDto FuelType { get; set; }

        public CarMakeDto CarMake { get; set; }

        public IEnumerable<ExtraDto> Extras { get; set; }

        public IEnumerable<TuningDto> Tunings { get; set; }
    }
}

