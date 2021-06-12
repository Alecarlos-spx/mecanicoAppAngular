import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

  @Input() msgErro: string;
  @Input() mostrarErro: boolean;

  

  constructor() { }

  ngOnInit() {
  }

}
