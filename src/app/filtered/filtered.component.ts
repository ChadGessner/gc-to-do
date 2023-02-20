import { Component, OnInit, Input } from '@angular/core';
import { Icon, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCoffee,
  faCheck,
  faBomb,
  faX
} from '@fortawesome/free-solid-svg-icons'
import { ApiService } from '../api.service';
import { ToDo } from '../models/ToDo.interface';

@Component({
  selector: 'app-filtered',
  templateUrl: './filtered.component.html',
  styleUrls: ['./filtered.component.scss']
})
export class FilteredComponent implements OnInit {
  @Input()toDos:ToDo[] = []
  faCoffee:IconDefinition = faCoffee;
  faCheck:IconDefinition = faCheck;
  faBomb:IconDefinition = faBomb;
  faX:IconDefinition = faX;
  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }
  completeTask(index:number) {
    let toUpdate:ToDo = this.toDos[index];
    this.api.updateToDo(toUpdate.task, !toUpdate.completed, null)
    this.toDos[index].completed = true;
  }
  deleteToDo(index:number){
    this.api.deleteToDo(this.toDos[index].task);
    this.toDos = this.toDos.slice(0,index).concat(this.toDos.slice(index + 1))
    this.api.getToDos();
  } 
  

}
