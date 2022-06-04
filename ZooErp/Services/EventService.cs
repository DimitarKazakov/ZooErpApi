using System;
using Microsoft.EntityFrameworkCore;
using ZooErp.Data;
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
        
        public async Task<IEnumerable<EventDto>> GetEvents(FilterDto filter)
        {
			var events = await this.context
				.Events
				.Where(x => (!filter.Id.HasValue || x.Id == filter.Id)
							&& (!filter.FilterDate.HasValue || DateTime.Compare(x.CreatedOn, (DateTime)filter.FilterDate) >= 0))
				.Select(x => new EventDto
				{
					Cage = x.Cage.Name,
					LastModifiedBy = x.LastModifiedBy,
					Type = x.Type.GetEnumDescription(),
					CreatedBy = x.CreatedBy,
					Description = x.Description,
					Id = x.Id,
					CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
					LastModifiedOn = x.LastModifiedOn.ToString("d/MM/yyyy")
				}).ToListAsync();

			if (filter.Skip != null)
			{
				events = events.Skip((int)filter.Skip).ToList();
			}

			if (filter.Take != null)
			{
				events = events.Take((int)filter.Take).ToList();
			}

			return events;
		}
	}
}

