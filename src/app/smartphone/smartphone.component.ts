import {Component, Injectable, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {PhoneService} from '../_services/phone.service';
import {Phone, PhoneShops} from '../_models/phone';
import {Brand} from '../_models/brand'
import {count, map} from 'rxjs/operators';
import {a} from '@angular/core/src/render3';


@Component({
  selector: 'app-smartphone',
  templateUrl: './smartphone.component.html',
  styleUrls: ['./smartphone.component.css', './smartphone.component.scss']
})


export class SmartphoneComponent implements OnInit {

  phonesShortInfo: any;
  selectedPhone: PhoneShops;
  phones: PhoneShops[] = [];
  public num: Number;
  dataNew: string = sessionStorage.getItem('brandName');
  sort: string;
  search: string;

  minPrise: string;
  maxPrise: string;

  count: number = 1;

  constructor(private phoneService: PhoneService,
              private router: Router,) {
  }

  ngOnInit() {
    this.getPhons(this.count - 1, this.dataNew, this.minPrise, this.maxPrise, this.sort);
  }


  getPhons(num, brand, min, max, sort) {
    this.phoneService
      .getPaginationPhones(num, brand, min, max, sort)
      .subscribe((arr) => {
        if (arr[0] !== null) {
          this.phonesShortInfo = arr[0].map(elem => {
            const infoSave = elem.info;
            elem.info = infoSave.map(item => {
              return item.split(":")
            });
          });
          this.phones = arr[0];
          this.num = arr[1];
        }
      });
  }

  prev(): void {
    if (this.count > 1) {
      this.getPhons((this.count--) - 2, this.dataNew, this.minPrise, this.maxPrise, this.sort);
    }
  }

  next(): void {
    if (this.count < this.num) {
      this.getPhons(this.count++, this.dataNew, this.minPrise, this.maxPrise, this.sort);
    }
  }

  voicePhone(velue) {
    let num = velue - 1;
    let phoneVoice = '';
    let elem = document.querySelectorAll('.card-image')[num];
    if (elem !== undefined) phoneVoice = elem.id;
    this.onSelect(phoneVoice.replace(/"/g, ''));
  }

  nextPage() {
    document.querySelector('.next').dispatchEvent(new Event('click'));
  }

  prevPage() {
    document.querySelector('.prev').dispatchEvent(new Event('click'));
  }

  onSelect(phoneId) {
    this.selectedPhone = phoneId;
    if (this.selectedPhone) {
      sessionStorage.setItem("phoneId", JSON.stringify(phoneId));
      this.router.navigate(['/product-phone'])
    }
  }

  minInput(value) {
    this.minPrise = value;
    this.count = 1;
    console.log(this.minPrise);
    this.getPhons(this.count - 1, this.dataNew, this.minPrise, this.maxPrise, this.sort)
  }

  maxInput(value) {
    this.maxPrise = value;
    this.count = 1;
    this.getPhons(this.count - 1, this.dataNew, this.minPrise, this.maxPrise, this.sort)
  }

  btnCheap(): void {
    this.sort = 'cheap';
    this.count = 1;
    this.getPhons(this.count - 1, this.dataNew, this.minPrise, this.maxPrise, this.sort);
    this.sort = undefined;
  }

  btnExpensive(): void {
    this.sort = 'expensive';
    this.count = 1;
    this.getPhons(this.count - 1, this.dataNew, this.minPrise, this.maxPrise, this.sort);
    this.sort = undefined;
  }

  cheap() {
    document.querySelector('.cheap').dispatchEvent(new Event('click'));
  }

  expensive() {
    document.querySelector('.expensive').dispatchEvent(new Event('click'));
  }

  searchInput(name) {
    if (name === '') {
      this.dataNew = 'Всі телефони'
    } else {
      this.dataNew = name;
    }
    this.count = 1;
    this.getPhons(this.count - 1, this.dataNew, this.minPrise, this.maxPrise, this.sort);
  }

  btnClear() {
    (<HTMLInputElement>document.getElementById('minPrice')).value = '';
    (<HTMLInputElement>document.getElementById('maxPrice')).value = '';
    this.count = 1;
    this.minPrise = undefined;
    this.maxPrise = undefined;
    this.sort = undefined;
    this.getPhons(this.count - 1, this.dataNew, this.minPrise, this.maxPrise, this.sort);
  }

  clear() {
    document.querySelector('.clear').dispatchEvent(new Event('click'));
  }

}


