using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoModels;

namespace ToDoRepository
{
    public class ApplicationDbContext : DbContext
    {
        private static IConfigurationRoot _configuration;
        public DbSet<ToDoDTO> toDoDTOs { get; set; }
        public ApplicationDbContext()
        {

        }
        public ApplicationDbContext(DbContextOptions options) : base(options) 
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            _configuration = builder.Build();
            string cnstr = _configuration.GetConnectionString("StringyConnections");
            optionsBuilder.UseSqlServer(cnstr);
        }
    }
}
