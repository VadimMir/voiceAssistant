import {Component, Injectable, OnInit, NgZone, EventEmitter, Output} from '@angular/core';
import {environmentNew} from '../../environments/environmentNew';

import {ApiAiClient} from 'api-ai-javascript/es6/ApiAiClient';

import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {FormBuilder} from "@angular/forms";

import {StartPageComponent} from '../start-page/start-page.component';
import {SmartphoneComponent} from '../smartphone/smartphone.component';
import {InputVoiceComponent} from '../main/input-voice/input-voice.component';
import {HederComponent} from '../heder/heder.component';
import {Router} from "@angular/router";
import {RegisterComponent} from '../auth/register';
import {WordsService} from "../_services/words.service"
import {ProductPhoneComponent} from '../product-phone/product-phone.component';
import {Word} from '../_models/words';

// Message class for displaying messages in the component
export class Message {
  constructor(public content: string, public sentBy: string) {
  }
}


@Injectable()
export class ChatService {

  readonly token = environmentNew.dialogflow.angularBot;
  readonly client = new ApiAiClient({accessToken: this.token});

  conversation = new BehaviorSubject<Message[]>([]);
  brands: any;
  wordsArr: Word;


  constructor(private startPage: StartPageComponent,
              private phonePage: SmartphoneComponent,
              private input: InputVoiceComponent,
              private heder: HederComponent,
              private router: Router,
              private zone: NgZone,
              private reg: RegisterComponent,
              private wordsService: WordsService,
              private phone: ProductPhoneComponent,) {
  }

  // Sends and receives messages via DialogFlow
  converse(msg: string) {

    if (msg === '') msg = 'wait';


    this.wordsService.getWordsAll()
      .subscribe((words) => {
        this.wordsArr = words[0];
      });

    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    return this.client.textRequest(msg)
      .then(res => {
        let speech = '';
        const msgArr = [];
        msgArr.push(msg.toLowerCase());


        let inputEl = document.activeElement, type;
        //this.wordsArr[0].nexFoto;

        this.brands = sessionStorage.getItem('brands').slice(1, -1).toLowerCase().split(',');


        if (document.querySelector('.voic').id === 'brand') {
          let brandArr = this.brands.map(elem => elem.replace(/"/g, ''));
          if ((Number(msg))) {
            if (Number(msg) > 0 && Number(msg) <= brandArr.length)
              this.zone.run(() => this.startPage.onSelect(brandArr[Number(msg) - 1]));
          }

          //brand
          let brandCheck = msgArr.filter((item) => brandArr.indexOf(item) !== -1);
          if (msgArr[0] === brandCheck[0]) {
            this.zone.run(() => this.startPage.onSelect(msg));
          }

        }


        //pnones from brand
        if (document.querySelector('.voic').id === 'phones') {
          //next
          if (this.wordsArr.right.indexOf(msg.toLowerCase()) !== -1) this.zone.run(() => this.phonePage.nextPage());
          //prev
          if (this.wordsArr.left.indexOf(msg.toLowerCase()) !== -1) this.zone.run(() => this.phonePage.prevPage());
          //phone
          if (Number(msg)) {
            this.zone.run(() => this.phonePage.voicePhone(msg));
          }

        }

        //login & register
        if (document.querySelector('.voic').id === 'input-voice') {
          if (this.wordsArr.accaunt.indexOf(msg.toLowerCase()) !== -1) {
            this.zone.run(() => this.router.navigate(['/register']));
          }
        }

        if (document.querySelector('.voic').id === 'login') {
          if (this.wordsArr.accaunt.indexOf(msg.toLowerCase()) !== -1) {
            this.zone.run(() => this.router.navigate(['/register']));
          }
        }

        //other
        if (this.wordsArr.main.indexOf(msg.toLowerCase()) !== -1) this.zone.run(() => this.heder.startPage());

        //enter
        if (this.wordsArr.enter.indexOf(msg.toLowerCase()) !== -1) this.zone.run(() => this.heder.openInput());

        //down
        if (this.wordsArr.down.indexOf(msg.toLowerCase()) !== -1) window.scrollBy(0, 300);
        //up
        if (this.wordsArr.up.indexOf(msg.toLowerCase()) !== -1) window.scrollBy(0, -300);

        // (<HTMLInputElement>document.getElementById('userName')).value = msg;

        //filter
        if (document.querySelector('.voic').id === 'phones') {

          if (this.wordsArr.minPrice.indexOf(msg.toLowerCase()) !== -1) {
            // (<HTMLInputElement>document.getElementById('minPrice')).value = 'Miн. вартість';
            document.getElementById('minPrice').focus()

          }

          if (inputEl.id === 'minPrice' && Number(msg)) {
            (<HTMLInputElement>document.getElementById('minPrice')).value = msg;
            document.getElementById('minPrice').dispatchEvent(new Event('input'));
          }

          if (this.wordsArr.maxPrice.indexOf(msg.toLowerCase()) !== -1) {

            document.getElementById('maxPrice').focus()
          }
          if (inputEl.id === 'maxPrice' && Number(msg)) {
            (<HTMLInputElement>document.getElementById('maxPrice')).value = msg;
            document.getElementById('maxPrice').dispatchEvent(new Event('input'));
          }

          if (this.wordsArr.cheap.indexOf(msg.toLowerCase()) !== -1) {
            this.zone.run(() => this.phonePage.cheap());
          }

          if (this.wordsArr.expensive.indexOf(msg.toLowerCase()) !== -1) {
            this.zone.run(() => this.phonePage.expensive());
          }

        }

        //search

        if (this.wordsArr.search.indexOf(msg.toLowerCase()) !== -1) {
          this.zone.run(() => this.router.navigate(['/phone']).then(() => {
            document.getElementById('search').focus();
          }))
        }
        if (inputEl.id === 'search' && this.wordsArr[0].cheap.indexOf(msg.toLowerCase()) === -1
          && this.wordsArr.expensive.indexOf(msg.toLowerCase()) === -1
          && this.wordsArr.minPrice.indexOf(msg.toLowerCase()) === -1
          && this.wordsArr.maxPrice.indexOf(msg.toLowerCase()) === -1) {
          (<HTMLInputElement>document.getElementById('search')).value = msg;
          document.getElementById('search').dispatchEvent(new Event('input'));
        }


        if (document.querySelector('.voic').id === 'product') {
          let count = 0;

          if (this.wordsArr.moreShops.indexOf(msg.toLowerCase()) !== -1) {
            this.zone.run(() => this.phone.scrapeAllShops());
            count++
          }

          if (this.wordsArr.caracteristic.indexOf(msg.toLowerCase()) !== -1) {
            this.zone.run(() => this.phone.accordion())
          }

          if (this.wordsArr.fotoOne.indexOf(msg.toLowerCase()) !== -1) {
            this.zone.run(() => this.phone.fotoFirst())
          }

          if (this.wordsArr.fotoTwo.indexOf(msg.toLowerCase()) !== -1) {
            this.zone.run(() => this.phone.fotoSecond())
          }

          if (this.wordsArr.fotoThree.indexOf(msg.toLowerCase()) !== -1) {
            this.zone.run(() => this.phone.fotoThird())
          }

          if (this.wordsArr.fotoFour.indexOf(msg.toLowerCase()) !== -1) {
            this.zone.run(() => this.phone.fotoFourth())
          }

          //next
          if (this.wordsArr.right.indexOf(msg.toLowerCase()) !== -1) this.zone.run(() => this.phone.moreShops());
          //prev
          if (this.wordsArr.left.indexOf(msg.toLowerCase()) !== -1) this.zone.run(() => this.phone.lessShops());


        }

        if (this.wordsArr.toPhone.indexOf(msg.toLowerCase()) !== -1) {
          this.zone.run(() => this.router.navigate(['/phone']));
        }

        if (this.wordsArr.toAdmin.indexOf(msg.toLowerCase()) !== -1) {
          this.zone.run(() => this.router.navigate(['/admin']));
        }

        if (this.wordsArr.clear.indexOf(msg.toLowerCase()) !== -1) {
          this.zone.run(() => this.phonePage.clear());
        }

        const botMessage = new Message(speech, 'bot');
        this.update(botMessage);
      });
  }

  // Adds message to source
  update(msg: Message) {
    console.log('botMessage:', msg);
    console.log('botMessage:', msg.content);
    console.log('botMessage:', msg.sentBy);
    this.conversation.next([msg]);
    if (msg.sentBy == 'bot') {
      ChatService.synthVoice(msg.content);
    }
  }

  // add voice to response
  static synthVoice(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    synth.speak(utterance);
  }

}
