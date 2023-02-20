using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoDomain;
using ToDoModels;

namespace GC_ToDo_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private ToDoInteractoratorizor _db;
        public ToDoController()
        {
            _db = new ToDoInteractoratorizor();
        }
        [HttpGet("GetToDo")]
        public IEnumerable<ToDoAPI> GetToDo()
        {
            return _db.GetAll().Select(t=> ToDoAPI.GetAPIFromDTO(t));
        }
        [HttpPost("AddToDo/{task}/{completed}")]
        public ToDoAPI AddToDo(string task, bool completed)
        {
            Console.WriteLine(task + " " + completed);
            ToDoAPI toDo = new ToDoAPI() 
            {
                Task = task,
                Completed = completed
            };
            try
            {
                return ToDoAPI.GetAPIFromDTO(_db.AddToDo(toDo));
            }
            catch
            {
                return null;
            }
        }
        [HttpPost("DeleteToDo/{task}")]
        public ToDoAPI DeleteToDo(string task)
        {
            ToDoAPI toDo = _db.GetToDoByTask(task);
            if (_db.RemoveToDo(toDo))
            {
                return toDo;
            }
            return toDo;
            
        }
        [HttpPost("UpdateToDo/{task}/{completed}/{newTask}")]
        public ToDoAPI UpdateToDo(string task, bool completed, string? newTask)
        {
            return ToDoAPI.GetAPIFromDTO(_db.UpdateToDo(task, completed, newTask));
        }
    }
}
