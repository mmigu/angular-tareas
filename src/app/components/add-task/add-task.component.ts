import { Component, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service'
import { Subscription } from 'rxjs'
import { Task } from '../../Task'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter()

  text: string;
  day: string;
  description: string;
  reminder: boolean = false;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value))
  }

  onSubmit() {
    if(!this.text) {
      alert('Please add a task!');
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      description: this.description,
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask)

    // clear form afterwards
    this.text = '';
    this.day = '';
    this.description = '';
    this.reminder = false;
  }
}
