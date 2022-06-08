using System;
using System.Globalization;
using Microsoft.EntityFrameworkCore;
using ZooErp.Data;
using ZooErp.Data.Entities;
using ZooErp.Models;
using ZooErp.Models.Enums;

namespace ZooErp.Services
{
	public class EventService
	{
        private readonly ApplicationDbContext context;
        private readonly AuthenticationService authService;

        public EventService(ApplicationDbContext context, AuthenticationService authService)
		{
            this.context = context;
            this.authService = authService;
        }
        
        public async Task<IEnumerable<EventDto>> GetAsync(FilterDto filter)
        {
			DateTime? createdOnFilter = null;
			DateTime? lastModifiedOnFilter = null;
			if (filter.CreatedOnDate != null)
			{
				createdOnFilter = DateTime.ParseExact(filter.CreatedOnDate, "d/MM/yyyy", CultureInfo.InvariantCulture);
			}

			if (filter.LastModifiedOnDate != null)
			{
				lastModifiedOnFilter = DateTime.ParseExact(filter.LastModifiedOnDate, "d/MM/yyyy", CultureInfo.InvariantCulture);
			}

			var events = await this.context
				.Events
				.Where(x => (!filter.Id.HasValue || x.Id == filter.Id)
							&& (!createdOnFilter.HasValue || DateTime.Compare(x.CreatedOn, (DateTime)createdOnFilter) >= 0)
							&& (!lastModifiedOnFilter.HasValue || DateTime.Compare(x.LastModifiedOn, (DateTime)lastModifiedOnFilter) >= 0)
							&& (!(filter.Description != null) || x.Description.ToLower().Contains(filter.Description.ToLower())))
				.Select(x => new EventDto
				{
					Cage = x.Cage.Name,
					CageId = x.CageId,
					LastModifiedBy = x.LastModifiedBy,
					Type = x.Type.GetEnumDescription(),
					CreatedBy = x.CreatedBy,
					Description = x.Description,
					Id = x.Id,
					TypeId = (int)x.Type,
					CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
					LastModifiedOn = x.LastModifiedOn.ToString("d/MM/yyyy")
				}).ToListAsync();

			if (filter.Skip.HasValue)
			{
				events = events.Skip((int)filter.Skip).ToList();
			}

			if (filter.Take.HasValue)
			{
				events = events.Take((int)filter.Take).ToList();
			}

			return events;
		}

		public async Task<bool> DeleteAsync(int id)
		{
			var cageEvent = await this.context.Events.Where(x => x.Id == id).FirstOrDefaultAsync();
			if (cageEvent != null)
			{
				this.context.Events.Remove(cageEvent);
			}

			await this.context.SaveChangesAsync();

			return true;
		}

		public async Task<bool> CreateAsync(CreateEventDto data, string token)
		{
			var userInfo = await this.authService.GetUserInfoAsync(token);
			var eventEntity = new Event
			{
				CageId = data.CageId,
				CreatedBy = userInfo.FullName,
				CreatedOn = DateTime.Now,
				LastModifiedBy = userInfo.FullName,
				LastModifiedOn = DateTime.Now,
				Description = data.Description,
				Type = (EventType)data.Type
			};

			await this.context.Events.AddAsync(eventEntity);

			await this.context.SaveChangesAsync();

			return true;
		}

		public async Task<IEnumerable<SelectDto>> GetOptions()
		{
			return await this.context.Events.Select(x => new SelectDto
			{
				Id = x.Id,
				Name = x.Type.GetEnumDescription()
			}).ToListAsync();
		}

		public async Task<bool> UpdateAsync(CreateEventDto data, int id, string token)
		{
			var entity = await this.context.Events.FirstOrDefaultAsync(x => x.Id == id);
			if (entity is null)
			{
				throw new Exception("Event with that id was not found");
			}

			var userInfo = await this.authService.GetUserInfoAsync(token);
			entity.LastModifiedBy = userInfo.FullName;
			entity.LastModifiedOn = DateTime.Now;
			entity.CageId = data.CageId;
			entity.Description = data.Description;
			entity.Type = (EventType)data.Type;

			this.context.Events.Update(entity);
			await this.context.SaveChangesAsync();

			return true;
		}
	}
}

