import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../_models';


@Component({
  selector: 'app-heder',
  templateUrl: './heder.component.html',
  styleUrls: ['./heder.component.css', './heder.component.scss']
})

export class HederComponent implements OnInit {

  search = true;
  onSearch: string;
  currentUser: User;

  btnSearch() {
    this.search = true;
  }

  constructor(private router: Router,) {
  }

  ngOnInit() {
  }

  openInput() {
    this.router.navigate(['/input'])
  }

  startPage() {
    this.router.navigate(['/'])
  }
  
  @Output() searchValue: EventEmitter<string> = new EventEmitter();

  inputSearch(value) {
    this.searchValue.emit(value);
  }

  phonePage() {
    this.router.navigate(['/phone']).then(() => {
      document.getElementById('search').focus();
    })

  }

  get isInput() {
    return this.currentUser && this.currentUser;
  }


  voice(message) {
    console.log(message)
  }

  voiceCom() {
    document.getElementById('voiceCom').click()
  }
}
