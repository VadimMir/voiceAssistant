import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {PhoneService} from '../../_services/phone.service';
import {Phone} from '../../_models/phone';

@Component({
  selector: 'app-manage-phones',
  templateUrl: './manage-phones.component.html',
  styleUrls: ['./manage-phones.component.css']
})
export class ManagePhonesComponent implements OnInit {

  phones: any;
  count: number = 1;
  public num: Number;
  dataNew: string;
  selectedPhone: any;

  constructor(private phoneService: PhoneService,
              private router: Router,) {
  }

  ngOnInit() {
    if (this.dataNew === undefined) this.dataNew = "Всі телефони";
    this.getAllPhone(this.count - 1, this.dataNew)
  }

  getAllPhone(page: number, brand: string) {
    this.phoneService.getAllPhoneAdmin(page, brand)
      .subscribe((arr) => {
        this.phones = arr[0]
        this.num = arr[1]

      });
  }


  prev(): void {
    if (this.count > 1) {
      this.getAllPhone((this.count--) - 2, this.dataNew);
    }
  }

  next(): void {
    if (this.count < this.num) {
      this.getAllPhone(this.count++, this.dataNew);
    }
  }

  inputBrand(value) {
    this.dataNew = value;
    this.count = 1;
    this.getAllPhone(this.count, this.dataNew)
  }


  deletePhone(id: string, shop: string) {
    this.phoneService.deletePhone(id, shop).subscribe(() => {
      this.getAllPhone(this.count, this.dataNew)
    })
  }


  onSelect(phoneId) {
    this.selectedPhone = phoneId;
    if (this.selectedPhone) {
      sessionStorage.setItem("phoneAdminId", JSON.stringify(phoneId));
      this.router.navigate(['/admin/manage-phone'])
    }
  }

}
