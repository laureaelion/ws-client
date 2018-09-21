
import { Component } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ws-client';

 

  /**
   * Instance d'un observable Websocket
   */
  private _socket: WebSocketSubject<any>;

  /**
   * Tableau pour recevoir les messages du serveur
   */
  public serverMessages: any[];

  public userInput: String = '';

  constructor() {
    
    console.log('connexion client WebSocket');

    this._socket = new WebSocketSubject('ws:127.0.0.1:8999');

    //Initialise le tableau des messages
    this.serverMessages = [];

    //juste pour tester la communication sortante
    //this._send();

    //Souscription aux message provenant du serveur
    this._socket
      .subscribe( (message) => {
        console.log(`Le serveur envoie : ` + JSON.stringify(message));
        this.serverMessages.push(message);
      },
      (err) => console.error('Erreur levée : ' + JSON.stringify(err)),
      ()=> console.warn('completed')
      );
    
    }
  
 /** private _send(): void {
    console.log('envoie un nouveau message vers le serveur : ' + this.userInput);
    this._socket.next('blabla');
  }
  */

  public envoyer(): void {
    console.log('Envoie la saisie utilisateur vers le serveur : ' + this.userInput);
    this._socket.next(this.userInput);
    this.userInput='';
  }
}
