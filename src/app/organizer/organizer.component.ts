import { Component, OnInit } from '@angular/core';
import { DateService } from '../shared/date.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService, Task } from '../shared/tasks.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form!: FormGroup;
  tasks: Task[] = [];

  constructor(public dateService: DateService,
              private tasksService: TasksService,) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });

    this.getTasks();
  }

  private getTasks() {
    this.dateService.date
      .pipe(
        switchMap((date) => {
          const d = date.format('DD-MM-YYYY');
          return this.tasksService.getTask(d);
        })
      ).subscribe(task => {
      this.tasks = task;
    });

  }

  submit() {
    const {title} = this.form.value;

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    };

    this.tasksService.create(task)
      .subscribe(() => {
        this.tasks.push(task);
        this.form.reset();
      });

  }

  remove(id: string, idx: number) {
    this.tasks.splice(idx, 1);
    this.tasksService.remove(id).subscribe();
  }
}
