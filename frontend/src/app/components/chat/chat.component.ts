import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{

  public message : string = '';
  public messages : any[] = [];

  ngOnInit(): void {
      this.listAllMessages();
  }

  constructor(private chatService : ChatService) { }

  public sendMessage() {
    this.chatService.sendMessage(this.message);
    this.messages.push(this.message);
    this.message = '';
  }

  public listAllMessages() {
    this.chatService.listAllMessages().subscribe((data) => {
      this.messages.push(data);
    }) 
  }
}
