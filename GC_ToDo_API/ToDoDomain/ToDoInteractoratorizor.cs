using ToDoModels;
using ToDoRepository;

namespace ToDoDomain
{
    public class ToDoInteractoratorizor
    {
        private Repository _db { get; set; }
        public ToDoInteractoratorizor()
        {
            _db = new Repository();
        }
        public IEnumerable<ToDoDTO> GetAll()
        {
            return _db.GetAll();
        }
        public IEnumerable<ToDoDTO> GetByCompleted(bool completed)
        {
            IEnumerable<ToDoDTO> result = _db.GetByCompleted(completed);
            if(result.Count() > 0)
            {
                return result;
            }
            throw new Exception("Not Found");
        }
        public ToDoDTO AddToDo(ToDoAPI api)
        {
            if(_db.AddToDo(api))
            {
                return _db.GetToDoByTask(api.Task);
            }
            throw new Exception("That ToDo already exists...");
        }
        public bool RemoveToDo(ToDoAPI api)
        {
            return _db.DeleteToDo(api);
        }
        public ToDoAPI GetToDoByTask(string task)
        {
            ToDoAPI toDo = ToDoAPI.GetAPIFromDTO(_db.GetToDoByTask(task));
            return toDo;
        }
        public ToDoDTO UpdateToDo(string task, bool completed, string? newTask)
        {
            ToDoAPI toDo = ToDoAPI.GetAPIFromDTO(_db.GetToDoByTask(task));//sdfgh
            if(toDo != null)
            {
                if(newTask == null || newTask == "null")
                {
                    return _db.UpdateToDo(new ToDoAPI()
                    {
                        Task = task,
                        Completed = completed,
                    }, task);
                }
                return _db.UpdateToDo(new ToDoAPI()
                {
                    Task = newTask,
                    Completed = completed
                }, task);

            }
            return _db.GetToDoByTask(task);
        }
    }
}