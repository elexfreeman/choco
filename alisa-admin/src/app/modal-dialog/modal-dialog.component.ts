import {Component, OnInit,  EventEmitter,Input, Output} from '@angular/core';

@Component({
    selector: 'app-modal-dialog',
    templateUrl: './modal-dialog.component.html',
    styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {

    @Input() show:boolean = false;
    @Input() content: string;
    @Input() title: string;

    @Output() onDone = new EventEmitter<boolean>();

    onOkPress(){
        this.onDone.emit(true);
    }

    constructor() {
    }

    ngOnInit() {
    }

}
