using System;
using Microsoft.EntityFrameworkCore;
using ZooErp.Data.Entities;

namespace ZooErp.Data
{
    public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext()
		{
		}

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Animal> Animals { get; set; }

        public DbSet<Food> Foods { get; set; }

        public DbSet<AnimalFood> AnimalFoods { get; set; }

        public DbSet<Cage> Cages { get; set; }

        public DbSet<Event> Events { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=localhost;Database=zooErp;User Id=sa;Password=reallyStrongPwd123;");
            }
        }
    }
}

