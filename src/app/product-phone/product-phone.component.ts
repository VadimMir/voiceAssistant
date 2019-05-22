import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PhoneService} from '../_services/phone.service';
import {Phone} from '../_models/phone';


@Component({
  selector: 'app-product-phone',
  templateUrl: './product-phone.component.html',
  styleUrls: ['./product-phone.component.css', './product-phone.component.scss']
})
export class ProductPhoneComponent implements OnInit {

  phones: any;
  phoneId: string;
  infoNew: any;
  priseNew: any;
  scrapeShops: any;
  phonesShops: any;
  arr: any;
  sum: number;

  constructor(private router: Router,
              private phoneService: PhoneService,) {
  }

  ngOnInit() {
    this.phoneId = sessionStorage.getItem('phoneId');
    this.phoneService
      .getPhoneById(this.phoneId)
      .subscribe((phoneAndShops) => {
        this.phones = phoneAndShops[0];
        this.infoNew = this.phones.info.map(elem => elem.split(':'));
        this.priseNew = Math.floor(this.phones.price);
        this.phonesShops = phoneAndShops[1];
        this.arr = this.phonesShops.map(phone => {
          if (phone.price !== 0) return phone.price;
        });
        this.sum = this.arr.reduce((a, b) => a + b);
        this.priseNew = (this.sum / this.arr.length).toFixed();
      })
  }

  shops() {
    this.phoneService
      .getShopsPhone(this.phoneId)
      .subscribe((shops) => {
        this.scrapeShops = shops;
      })
  }

  btnShop() {
    this.shops();
  }

  scrapeAllShops() {
    document.querySelector('.scrapeAllShops').dispatchEvent(new Event('click'));
  }

  accordion() {
    document.getElementById('checkbox-2').click()
  }

  fotoFirst() {
    document.getElementById('fotoFirst').click()
  }

  fotoSecond() {
    document.getElementById('fotoSecond').click()
  }

  fotoThird() {
    document.getElementById('fotoThird').click()
  }

  fotoFourth() {
    document.getElementById('fotoFourth').click()
  }

  moreShops() {
    document.querySelector('*[aria-label^="Next page"]').dispatchEvent(new Event('click'));
  }

  lessShops() {
    document.querySelector('*[aria-label^="Previous page"]').dispatchEvent(new Event('click'));
  }

}
