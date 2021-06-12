import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';

@NgModule({
  declarations: [MessageComponent, ErrorMsgComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [MessageComponent],
  exports: [
    MessageComponent, 
    ErrorMsgComponent
  ]
  
})
export class SharedModule { }
