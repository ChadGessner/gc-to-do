import { Component, OnInit, Injectable, Input, } from '@angular/core';
import { Icon, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCoffee,
  faCheck,
  faBomb,
  faX
} from '@fortawesome/free-solid-svg-icons'
import { ApiService } from '../api.service';
import { ToDo } from '../models/ToDo.interface';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
@Injectable()
export class ToDoComponent implements OnInit {
  faCoffee:IconDefinition = faCoffee;
  faCheck:IconDefinition = faCheck;
  faBomb:IconDefinition = faBomb;
  faX:IconDefinition = faX;
  @Input()stuff:string = ''
  formMessage:string = 'filter your todos'
  taskName:string = 'task name'
  newToDo:string = 'add todo'
  isFiltersToDos:boolean = false;
  filterByTruthy:boolean = true;
  filteredToDos:ToDo[] = [] // or static [ { task: t, completed: false }, { task: a, completed: false }, { task: s, completed: true  }, {task: this assignment, completed: true}, { task: stuff, completed: false }, { task: things, completed: true } ]
  @Input()apiCompleted:ToDo[] | undefined = undefined;
   toDos:ToDo[] = []
  constructor(private api:ApiService) { 
    
  }
  // filterClick() {
  //   this.isFiltersToDos = true;
    
  //     this.filteredToDos = this.filterByTruthy ? this.toDos.filter(
  //       x => x.completed 
  //     ) : this.toDos.filter(
  //       x => !x.completed 
  //     )
  // }
  onTruthiness() {
    if(!this.filterByTruthy){
      this.isFiltersToDos = true;
      this.filterByTruthy = true;
      this.filteredToDos = this.toDos.filter(x => x.completed === this.filterByTruthy)
    }else if(this.isFiltersToDos){
      this.isFiltersToDos = false;
    }
  }

  onFilterByTaskName() {
    this.isFiltersToDos = true;
    this.filteredToDos = this.toDos.filter(x => x.task.toLowerCase().includes(this.taskName.toLowerCase()))
  }

  onSubmit(formMessage:NgForm) {
    console.log(formMessage)
  }

  getToDos(event:Event){
    this.api.getToDos();
    this.onApiUpdate();
    
  }
  
  onFalsiness() {
    if(this.filterByTruthy){
      this.isFiltersToDos = true;
      this.filterByTruthy = false;
      this.filteredToDos = this.toDos.filter(x => x.completed === this.filterByTruthy)
    }else if(this.isFiltersToDos){
      this.isFiltersToDos = false;
    }
    
  }

  addToDo(task:string){
    this.api.addToDo(task, false);
    this.toDos.push({
      task: task,
      completed: false
    })
    console.log(this.toDos)
    this.newToDo = 'add to do';
    this.onApiUpdate();
  }
  onApiUpdate(){
    this.api.getToDos();
  }
  ngOnInit(): void {
    this.api.getToDos().subscribe((data: ToDo[])=> this.toDos = data);
    
  }

}
