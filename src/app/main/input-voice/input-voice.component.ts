import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-input-voice',
  templateUrl: './input-voice.component.html',
  styleUrls: ['./input-voice.component.css']
})
export class InputVoiceComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  openLogin() {
    this.router.navigate(['/login'])
  }

}
