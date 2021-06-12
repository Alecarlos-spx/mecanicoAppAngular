import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageComponent } from './message/message.component';

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }


  ShowConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string){
    const bsModalRef: BsModalRef = this.modalService.show(MessageComponent);
    bsModalRef.content.titulo = title;
    bsModalRef.content.mensagem = msg;
    
    if(okTxt)
    {
      bsModalRef.content.okTxt = okTxt;
    }

    if(cancelTxt)
    {
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    return (<MessageComponent>bsModalRef.content).confirmResult;

  }


}


