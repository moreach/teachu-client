import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appRoutes } from 'src/app/Config/appRoutes';

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.scss']
})
export class ChatConversationComponent implements OnInit {

  chatId: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.chatId = this.activatedRoute.snapshot.paramMap.get(appRoutes.ChatId) ?? '';
  }

  openSettings() {
    this.router.navigate([`${appRoutes.App}/${appRoutes.Chat}/${this.chatId}/${appRoutes.ConversationInfo}`]);
  }
}
