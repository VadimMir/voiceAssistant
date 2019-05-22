import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {config} from '../app.config'
import {Brand} from '../_models/brand';

@Injectable()
export class BrandService {
  constructor(private http: HttpClient) {
  }

  getAllBrand() {
    return this.http.get<Brand[]>(`${config.apiUrl}/brands`);
  }

  getByNameBrand(nameBrand: string) {
    return this.http.get(`${config.apiUrl}/brands` + nameBrand);
  }

  getByUrlLogo(urlLogo: string) {
    return this.http.get(`${config.apiUrl}/brands` + urlLogo);
  }
}
