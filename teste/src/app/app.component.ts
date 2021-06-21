import { Component, OnInit } from '@angular/core';
// import { RxStompService } from '@stomp/ng2-stompjs';
// import { Message } from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public notifications: string[] = [];

  private client: StompJs.Client | null = null;

  ngOnInit(){
    // this.connectedClicked();
  }

  connectedClicked(){
    console.log('Conectando....');
    if(!this.client || this.client.connected){
      this.client = new StompJs.Client({
        webSocketFactory: () => new SockJS("http://localhost:8080/notifications"),
        debug: (msg: string) => console.log(msg)
      });

      this.client.onConnect = () => {

        this.client?.subscribe('/user/notification/item', (response) => {
          const text: string = JSON.parse(response.body).text;
          console.log('Got: '+text);
          this.notifications.push(text);
        });

        console.log("Connected");
      }

      this.client.onStompError = (frame) => {
        console.error(frame.headers['message']);
        console.error('Details: ', frame.body);
      }

      this.client.activate();
    }
  }

  disconnectClicked() {
    if (this.client && this.client.connected) {
      this.client.deactivate();
      this.client = null;
      console.info("disconnected :-/");
    }
  }

  startClicked() {
    if (this.client && this.client.connected) {
      console.log("Conectando")
      this.client.publish({destination: '/swns/start', body: "2398492384"});
    }
  }

  stopClicked() {
    if (this.client && this.client.connected) {
      this.client.publish({destination: '/swns/stop'});
    }
  }
  // title = 'teste';
  // msgs: string[] =[];

  // constructor(private rxStompService: RxStompService){}

  // ngOnInit(){
  //   this.rxStompService.watch('/user/notification/item').subscribe((message: Message) => {
  //     this.msgs.push(message.body);
  //   });
  // }

  // startNotificacao() {
  //   const message = `Message generated at ${new Date}`;
  //   this.rxStompService.publish({destination: '/swns/start'});
  // }

}
