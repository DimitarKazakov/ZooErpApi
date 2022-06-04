using System;
using Microsoft.EntityFrameworkCore;
using PuWeb.Data;
using PuWeb.Data.Entities;
using PuWeb.Models;

namespace PuWeb.Services
{
	public class TuningService
	{
        private readonly ApplicationDbContext context;
        private readonly AuthenticationService authService;

        public TuningService(ApplicationDbContext context, AuthenticationService authService)
		{
            this.context = context;
            this.authService = authService;
        }

        public async Task<IEnumerable<TuningDto>> GetAllAsync()
        {
            return await this.context.Tunings
                .OrderByDescending(x => x.CreatedOn)
                .Select(x => new TuningDto
                {
                    Id = x.Id,
                    Brand = x.Brand,
                    CreatedBy = x.CreatedBy,
                    Description = x.Description,
                    Function = x.Function,
                    ImageUrl = x.ImageUrl,
                    Name = x.Name,
                    NumberOfCars = x.CarTunings.Count,
                    CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
                    LastModifiedBy = x.LastModifiedBy != null ? x.LastModifiedBy: "X",
                    LastModifiedOn = x.LastModifiedOn != null ? x.LastModifiedOn.Value.ToString("d/MM/yyyy") : "X",

                }).ToListAsync();
        }

        public async Task<TuningDto> GetByIdAsync(int id)
        {
            var data = await this.context.Tunings
                .Where(x => x.Id == id)
                .Select(x => new TuningDto
                {
                    Id = x.Id,
                    Brand = x.Brand,
                    CreatedBy = x.CreatedBy,
                    Description = x.Description,
                    Function = x.Function,
                    ImageUrl = x.ImageUrl,
                    Name = x.Name,
                    NumberOfCars = x.CarTunings.Count,
                    CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
                    LastModifiedBy = x.LastModifiedBy != null ? x.LastModifiedBy : "X",
                    LastModifiedOn = x.LastModifiedOn != null ? x.LastModifiedOn.Value.ToString("d/MM/yyyy") : "X",
                }).FirstOrDefaultAsync();

            if (data == null)
            {
                throw new Exception("Tuning with that id was not found");
            }

            return data;
        }

        public async Task<bool> UpdateAsync(CreateTuningDto data, int id, string token)
        {
            var entity = await this.context.Tunings.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null)
            {
                throw new Exception("Tuning with that id was not found");
            }

            var userInfo = await this.authService.GetUserInfoAsync(token);
            entity.Brand = data.Brand;
            entity.Description = data.Description;
            entity.ImageUrl = data.ImageUrl;
            entity.LastModifiedOn = DateTime.Now;
            entity.Name = data.Name;
            entity.Function = data.Function;
            entity.LastModifiedBy = userInfo.FullName;
            this.context.Tunings.Update(entity);
            await this.context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> CreateAsync(CreateTuningDto data, string token)
        {
            var userInfo = await this.authService.GetUserInfoAsync(token);
            await this.context.Tunings.AddAsync(new Tuning
            {
                Brand = data.Brand,
                CreatedBy = userInfo.FullName,
                CreatedOn = DateTime.Now,
                Description = data.Description,
                ImageUrl = data.ImageUrl,
                Name = data.Name,
                Function = data.Function
            });

            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var carTunings = await this.context.CarTunings.Where(x => x.TuningId == id).ToListAsync();
            if (carTunings.Any())
            {
                this.context.CarTunings.RemoveRange(carTunings);
            }

            var tuning = await this.context.Tunings.FirstOrDefaultAsync(x => x.Id == id);
            if (tuning != null)
            {
                this.context.Tunings.Remove(tuning);
            }

            await this.context.SaveChangesAsync();
            return true;
        }
    }
}

