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
  newToDo:string = 'add todo'
  isFiltersToDos:boolean = false;
  @Input()apiCompleted:ToDo[] | undefined = undefined;
   toDos:ToDo[] = []
  constructor(private api:ApiService) { 
    
  }
  onTruthiness() {
    this.isFiltersToDos = !this.isFiltersToDos;
    this.stuff = `${this.isFiltersToDos}` + this.stuff;
  }
  onSubmit(formMessage:NgForm) {
    console.log(formMessage)
  }
  getFilteredOrDefault() {
    return this.isFiltersToDos ? this.toDos.filter(x => x.completed) : this.toDos;
  }
  getToDos(event:Event){
    this.api.getToDos();
    this.onApiUpdate();
    
  }
  deleteToDo(index:number){
    this.api.deleteToDo(this.toDos[index].task);
    this.toDos = this.toDos.slice(0,index).concat(this.toDos.slice(index + 1))
    this.onApiUpdate();
  } 
  
  completeTask(index:number) {
    let toUpdate:ToDo = this.toDos[index];
    this.api.updateToDo(toUpdate.task, !toUpdate.completed, null)
    this.toDos[index].completed = true;
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
