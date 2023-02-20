import { Injectable, EventEmitter, OnInit, Output } from "@angular/core";
import { ToDo } from "./models/ToDo.interface";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, Observable, Subject, BehaviorSubject } from "rxjs";


@Injectable()
export class ApiService implements OnInit {
    ToDos:ToDo[] = [];
    url:string = 'https://localhost:7257/api/ToDo/GetToDo/';
    addUrl:string = 'https://localhost:7257/api/ToDo/AddToDo';
    deleteUrl:string = 'https://localhost:7257/api/ToDo/DeleteToDo';
    updateUrl:string = 'https://localhost:7257/api/ToDo/UpdateToDo';
    @Output()toDosEvent:EventEmitter<ToDo[]> = new EventEmitter<ToDo[]>(true);
    constructor(private http:HttpClient ) {
    }
    emitToDo(){
        return this.toDosEvent.emit(this.ToDos)
    }
    addToDo(task:string, completed:boolean){
        this.http.post(this.addUrl + `/${task.split(' ').join('%20')}/${completed}`, {task, completed}, {'headers':{'accept' : 'text/plain', 'content-type' : 'text/plain'}})
        .subscribe()
    }
    getToDos = ():Observable<ToDo[]> => {
        this.ToDos = [];
        return this.http.get<{}>(this.url).pipe(
            map(
                (responseData:{[key:string]:ToDo})=> {
                    
                    for(const key in responseData){
                        console.log(responseData[key])
                        this.ToDos.push(responseData[key])
                    }
                    return this.ToDos.slice(); 
                }
            )
        )
    }
    deleteToDo(task:string) {
        this.http.post<string>(this.deleteUrl + `/${task.split(' ').join('%20')}`, {task} , {'headers' : {'accept': 'text/plain', 'content-type' : 'text/plain'}} )
        .subscribe();
    }
    updateToDo(task:string, completed:boolean, newTask:string|null){
        console.log(this.updateUrl + `/${task.split(' ').join('%20')}/${completed}/${newTask !== null ? newTask.split(' ').join('%20') : null }`);
        
        this.http.post<ToDo>(
            this.updateUrl + `/${task.split(' ').join('%20')}/${completed}/${newTask !== null ? newTask.split(' ').join('%20') : null }`, {task, completed},{ 'headers' : { 'accept' : 'text/plain', 'content-type' : 'text/plain' } }
        ).subscribe();
    }
    ngOnInit():void {
        
    }
    

}