using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ToDoModels;

namespace ToDoRepository
{
    public class Repository
    {
        //private ApplicationDbContext _db { get; set; }
        private IConfigurationRoot _configuration;
        private DbContextOptionsBuilder<ApplicationDbContext> _optionsBuilder;
        public Repository()
        {
            BuildOptions();
        }
        private void BuildOptions()
        {
            _configuration = ConfigurationBuilderSingleton.ConfigurationRoot;
            _optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            _optionsBuilder.UseSqlServer(_configuration.GetConnectionString("StringyConnections"));
        }

        public IEnumerable<ToDoDTO> GetAll()
        {
            using (ApplicationDbContext db = new ApplicationDbContext(_optionsBuilder.Options)) 
            {
                return db.toDoDTOs.ToList();
            }
        }
        public IEnumerable<ToDoDTO> GetByCompleted(bool completed)
        {
            using (ApplicationDbContext db = new ApplicationDbContext(_optionsBuilder.Options))
            {
                IEnumerable<ToDoDTO> filtered = db.toDoDTOs.Where(t=>t.Completed == completed);
                return filtered;
            }
        }
        public bool AddToDo(ToDoAPI api)
        {
            using (ApplicationDbContext db = new ApplicationDbContext(_optionsBuilder.Options))
            {
                ToDoDTO toAdd = db.toDoDTOs.FirstOrDefault(t => t.Task == api.Task);
                if(toAdd != null)
                {
                    return false;
                }
               

                db.Add(new ToDoDTO() { Task = api.Task, Completed = api.Completed});
                db.SaveChanges();
                return true;
            }
        }
        public bool DeleteToDo(ToDoAPI api)
        {
            using (ApplicationDbContext db = new ApplicationDbContext(_optionsBuilder.Options))
            {
                ToDoDTO toDelete = db.toDoDTOs.FirstOrDefault(t => t.Task == api.Task);
                if (toDelete != null)
                {
                    db.Remove(toDelete);
                    db.SaveChanges();
                    return true;
                }
                return false;
            }
        }
        public ToDoDTO GetToDoByTask(string task)
        {
            using (ApplicationDbContext db = new ApplicationDbContext(_optionsBuilder.Options))
            {
                ToDoDTO toDo = db.toDoDTOs.FirstOrDefault(t => t.Task == task);
                return toDo;
            }
        }
        
        public ToDoDTO UpdateToDo(ToDoAPI toDo, string task)
        {
            using (ApplicationDbContext db = new ApplicationDbContext(_optionsBuilder.Options))
            {
                ToDoDTO toUpdate = GetToDoByTask(task);
                toUpdate.Task = toDo.Task;
                toUpdate.Completed = toDo.Completed;
                db.Update(toUpdate);
                db.SaveChanges();
                return toUpdate;
            }
        }

    }
}