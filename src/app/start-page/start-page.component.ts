import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BrandService} from '../_services/brand.service';
import {Brand} from '../_models/brand';


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  selectedBrand: Brand;

  brands: Brand [] = [];
  brandNameArr: any;

  constructor(private brandService: BrandService,
              private router: Router,) {
  }

  ngOnInit() {
    this.brandService.getAllBrand()
      .subscribe((brands) => {
        this.brands = brands;
        this.brandNameArr = brands.map(elem => elem.nameBrand);
        sessionStorage.setItem("brands", JSON.stringify(this.brandNameArr));
      });
  }

  onSelect(brand) {
    this.selectedBrand = brand;
    if (this.selectedBrand) {
      sessionStorage.setItem("brandName", JSON.stringify(brand));
      this.router.navigate(['/phone'])

    }
  }

}

