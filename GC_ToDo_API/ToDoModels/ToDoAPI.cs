namespace ToDoModels
{
    public class ToDoAPI
    {
        public string Task { get; set; }
        public bool Completed { get; set; }

        public static ToDoAPI GetAPIFromDTO(ToDoDTO dto)
        {
            return new ToDoAPI 
            { 
                Task = dto.Task,
                Completed = dto.Completed 
            };
        }

    }
}