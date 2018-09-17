import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dialog-deleted',
  templateUrl: './dialog-deleted.component.html',
  styleUrls: ['./dialog-deleted.component.css']
})
export class DialogDeletedComponent implements OnInit {

    @Input() show:boolean = false;
    @Input() content: string;
    @Input() title: string;

    @Output() onDone = new EventEmitter<boolean>();
    @Output() onCancel = new EventEmitter<boolean>();

    onOkPress(){
        this.onDone.emit(true);
    }

    onCancelPress(){
        this.onCancel.emit(true);
    }


  constructor() { }

  ngOnInit() {
  }

}
