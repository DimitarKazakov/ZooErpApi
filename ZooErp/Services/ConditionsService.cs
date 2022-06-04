using System;
using Microsoft.EntityFrameworkCore;
using PuWeb.Data;
using PuWeb.Data.Entities;
using PuWeb.Models;

namespace PuWeb.Services
{
	public class ConditionsService
	{
        private readonly ApplicationDbContext context;
        private readonly AuthenticationService authService;

        public ConditionsService(ApplicationDbContext context, AuthenticationService authService)
		{
            this.context = context;
            this.authService = authService;
        }

        public async Task<IEnumerable<ConditionDto>> GetAllAsync()
        {
            return await this.context.Conditions
                .OrderByDescending(x => x.CreatedOn)
                .Select(x => new ConditionDto
                {
                    Id = x.Id,
                    CreatedBy = x.CreatedBy,
                    CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
                    Explanation = x.Explanation,
                    Name = x.Name,
                    NumberOfCars = x.Cars.Count,
                    Reason = x.Reason,
                    LastModifiedBy = x.LastModifiedBy != null ? x.LastModifiedBy : "X",
                    LastModifiedOn = x.LastModifiedOn != null ? x.LastModifiedOn.Value.ToString("d/MM/yyyy") : "X",
                })
                .ToListAsync();
        }

        public async Task<ConditionDto> GetByIdAsync(int id)
        {
            var data = await this.context.Conditions
                .Where(x => x.Id == id)
                .Select(x => new ConditionDto
                {
                    CreatedBy = x.CreatedBy,
                    CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
                    NumberOfCars = x.Cars.Count,
                    Id = x.Id,
                    Name = x.Name,
                    Explanation = x.Explanation,
                    Reason = x.Reason,
                    LastModifiedBy = x.LastModifiedBy != null ? x.LastModifiedBy : "X",
                    LastModifiedOn = x.LastModifiedOn != null ? x.LastModifiedOn.Value.ToString("d/MM/yyyy") : "X",
                })
                .FirstOrDefaultAsync();

            if (data is null)
            {
                throw new Exception("Condition with that id was not found");
            }

            return data;
        }

        public async Task<bool> UpdateAsync(CreateConditionDto data, int id, string token)
        {
            var entity = await this.context.Conditions.FirstOrDefaultAsync(x => x.Id == id);
            if (entity is null)
            {
                throw new Exception("Condition with that id was not found");
            }

            var userInfo = await this.authService.GetUserInfoAsync(token);
            entity.LastModifiedBy = userInfo.FullName;
            entity.LastModifiedOn = DateTime.Now;
            entity.Explanation = data.Explanation;
            entity.Reason = data.Reason;
            entity.Name = data.Name;

            this.context.Conditions.Update(entity);
            await this.context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> CreateAsync(CreateConditionDto data, string token)
        {
            var userInfo = await this.authService.GetUserInfoAsync(token);
            await this.context.Conditions.AddAsync(new Condition
            {
                Name = data.Name,
                Explanation = data.Explanation,
                Reason = data.Reason,
                CreatedBy = userInfo.FullName,
                CreatedOn = DateTime.Now
            });

            await this.context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var cars = await this.context.Cars.Where(x => x.ConditionId == id).ToListAsync();
            foreach (var car in cars)
            {
                var carExtras = await this.context.CarExtras.Where(x => x.CarId == car.Id).ToListAsync();
                var carTunings = await this.context.CarTunings.Where(x => x.CarId == car.Id).ToListAsync();
                this.context.CarExtras.RemoveRange(carExtras);
                this.context.CarTunings.RemoveRange(carTunings);
            }

            if (cars.Any())
            {
                this.context.Cars.RemoveRange(cars);
            }

            var condition = await this.context.Conditions.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (condition != null)
            {
                this.context.Conditions.Remove(condition);
            }

            await this.context.SaveChangesAsync();

            return true;
        }
    }
}

