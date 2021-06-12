import { Component, Injectable, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private bsModalRef: BsModalRef) { }

  @Input() cancelTxt = 'Cancelar';
  @Input() okTxt = 'Sim'
  @Input()mensagem :string;
  @Input() titulo: string;

  confirmResult: Subject<Boolean>;

  ngOnInit() {
    this.confirmResult = new Subject();
  }

  onConfirm(){
    this.confirmAndClose(true);
  }
  
  onClose() {
    this.confirmAndClose(false);
  }

  private confirmAndClose(value: boolean)
  {
    this.confirmResult.next(value);  
    this.bsModalRef.hide();
  }
}
