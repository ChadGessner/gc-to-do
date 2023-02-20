using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoModels
{
    public class ToDoDTO
    {
        public int Id { get; set; }
        public string Task { get; set; }
        public bool Completed { get; set; }
    }
}
