using System;
using Microsoft.EntityFrameworkCore;
using PuWeb.Data;
using PuWeb.Data.Entities;
using PuWeb.Models;

namespace PuWeb.Services
{
	public class ExtrasService
	{
        private readonly ApplicationDbContext context;
        private readonly AuthenticationService authService;

        public ExtrasService(ApplicationDbContext context, AuthenticationService authService)
		{
            this.context = context;
            this.authService = authService;
        }

        public async Task<IEnumerable<ExtraDto>> GetAllAsync()
        {
            return await this.context.Extras
                .OrderByDescending(x => x.CreatedOn)
                .Select(x => new ExtraDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
                    Brand = x.Brand,
                    CreatedBy = x.CreatedBy,
                    ImageUrl = x.ImageUrl,
                    NumberOfCars = x.CarExtras.Count,
                    UsualPrice = x.UsualPrice,
                    LastModifiedBy = x.LastModifiedBy != null ? x.LastModifiedBy : "X",
                    LastModifiedOn = x.LastModifiedOn != null ? x.LastModifiedOn.Value.ToString("d/MM/yyyy") : "X",
                }).ToListAsync();
        }

        public async Task<ExtraDto> GetByIdAsync(int id)
        {
            var data = await this.context.Extras
                .Where(x => x.Id == id)
                .Select(x => new ExtraDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
                    Brand = x.Brand,
                    CreatedBy = x.CreatedBy,
                    ImageUrl = x.ImageUrl,
                    NumberOfCars = x.CarExtras.Count,
                    UsualPrice = x.UsualPrice,
                    LastModifiedBy = x.LastModifiedBy != null ? x.LastModifiedBy : "X",
                    LastModifiedOn = x.LastModifiedOn != null ? x.LastModifiedOn.Value.ToString("d/MM/yyyy") : "X",
                }).FirstOrDefaultAsync();

            if (data is null)
            {
                throw new Exception("Extra with that id was not found");
            }

            return data;
        }

        public async Task<bool> UpdateAsync(CreateExtraDto data, int id, string token)
        {
            var entity = await this.context.Extras.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null)
            {
                throw new Exception("Extra with that id was not found");
            }

            var userInfo = await this.authService.GetUserInfoAsync(token);
            entity.Brand = data.Brand;
            entity.Description = data.Description;
            entity.ImageUrl = data.ImageUrl;
            entity.LastModifiedOn = DateTime.Now;
            entity.Name = data.Name;
            entity.UsualPrice = data.UsualPrice;
            entity.LastModifiedBy = userInfo.FullName;
            this.context.Extras.Update(entity);
            await this.context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> CreateAsync(CreateExtraDto data, string token)
        {
            var userInfo = await this.authService.GetUserInfoAsync(token);
            await this.context.Extras.AddAsync(new Extra
            {
                Brand = data.Brand,
                CreatedBy = userInfo.FullName,
                CreatedOn = DateTime.Now,
                Description = data.Description,
                ImageUrl = data.ImageUrl,
                Name = data.Name,
                UsualPrice = data.UsualPrice
            });

            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var carExtras = await this.context.CarExtras.Where(x => x.ExtraId == id).ToListAsync();
            if (carExtras.Any())
            {
                this.context.CarExtras.RemoveRange(carExtras);
            }

            var extra = await this.context.Extras.FirstOrDefaultAsync(x => x.Id == id);
            if (extra != null)
            {
                this.context.Extras.Remove(extra);
            }

            await this.context.SaveChangesAsync();
            return true;
        }
    }
}

