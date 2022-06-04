using System;
using Microsoft.EntityFrameworkCore;
using PuWeb.Data;
using PuWeb.Data.Entities;
using PuWeb.Models;

namespace PuWeb.Services
{
	public class BodyStylesService
	{
        private readonly ApplicationDbContext context;
        private readonly AuthenticationService authService;

        public BodyStylesService(ApplicationDbContext context, AuthenticationService authService)
		{
            this.context = context;
            this.authService = authService;
        }

        public async Task<IEnumerable<BodyStyleDto>> GetAllAsync()
        {
            return await this.context.BodyStyles
                .OrderByDescending(x => x.CreatedOn)
                .Select(x => new BodyStyleDto
                {
                    Id = x.Id,
                    CreatedBy = x.CreatedBy,
                    CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
                    Description = x.Description,
                    Name = x.Name,
                    NumberOfCars = x.Cars.Count,
                    LastModifiedBy = x.LastModifiedBy != null ? x.LastModifiedBy : "X",
                    LastModifiedOn = x.LastModifiedOn != null ? x.LastModifiedOn.Value.ToString("d/MM/yyyy") : "X",
                })
                .ToListAsync();
        }

        public async Task<BodyStyleDto> GetByIdAsync(int id)
        {
            var data =  await this.context.BodyStyles
                .Where(x => x.Id == id)
                .Select(x => new BodyStyleDto
                {
                    CreatedBy = x.CreatedBy,
                    CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
                    NumberOfCars = x.Cars.Count,
                    Description = x.Description,
                    Id = x.Id,
                    Name = x.Name,
                    LastModifiedBy = x.LastModifiedBy != null ? x.LastModifiedBy : "X",
                    LastModifiedOn = x.LastModifiedOn != null ? x.LastModifiedOn.Value.ToString("d/MM/yyyy") : "X",
                })
                .FirstOrDefaultAsync();

            if (data is null)
            {
                throw new Exception("Body Style with that id was not found");
            }

            return data;
        }

        public async Task<bool> UpdateAsync(CreateBodyStyleDto data, int id, string token)
        {
            var entity = await this.context.BodyStyles.FirstOrDefaultAsync(x => x.Id == id);
            if (entity is null)
            {
                throw new Exception("Body Style with that id was not found");
            }

            var userInfo = await this.authService.GetUserInfoAsync(token);
            entity.LastModifiedBy = userInfo.FullName;
            entity.LastModifiedOn = DateTime.Now;
            entity.Name = data.Name;
            entity.Description = data.Description;

            this.context.BodyStyles.Update(entity);
            await this.context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> CreateAsync(CreateBodyStyleDto data, string token)
        {
            var userInfo = await this.authService.GetUserInfoAsync(token);
            await this.context.BodyStyles.AddAsync(new BodyStyle
            {
                Name = data.Name,
                Description = data.Description,
                CreatedBy = userInfo.FullName,
                CreatedOn = DateTime.Now
            });

            await this.context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var cars = await this.context.Cars.Where(x => x.BodyStyleId == id).ToListAsync();
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

            var bodyStyle = await this.context.BodyStyles.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (bodyStyle != null)
            {
                this.context.BodyStyles.Remove(bodyStyle);
            }

            await this.context.SaveChangesAsync();

            return true;
        }
	}
}

