import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {config} from '../app.config';
import {Phone} from '../_models/phone';


@Injectable()
export class PhoneService {

  constructor(private http: HttpClient) {
  }

  getAllPhone() {
    return this.http.get<Phone[]>(`${config.apiUrl}/phones`); // <> конструктор
  }

  getAllPhoneAdmin(num: number, brand: string) {
    return this.http.post(`${config.apiUrl}/phonesAdmin`, {
      num: `${num}`,
      brand: `${brand}`,
    });
  }

  deletePhone(id: string, shop: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        id: id,
        shop: shop
      }
    };
    return this.http.delete(`${config.apiUrl}/phonesAdmin`, options);

  }

  updatePhone(phone: any) {
    return this.http.put(`${config.apiUrl}/phoneAdmin`, phone);
  }

  /*getByimagePhone(imagePhone: []) {
    return this.http.get(`${config.apiUrl}/phones` + imagePhone );
  }*/

  getByName(nameSearch: string) {
    return this.http.get(`${config.apiUrl}/phones` + nameSearch);
  }

  getByPrice(price: number) {
    return this.http.get(`${config.apiUrl}/phones` + price);
  }

  getByBrand(brand: string) {
    return this.http.get(`${config.apiUrl}/phones` + brand);
  }

  getByModel(model: string) {
    return this.http.get(`${config.apiUrl}/phones` + model);
  }

  /* getByInfo(info: []) {
     return this.http.get(`${config.apiUrl}/phones` + info );
   }*/

  getByNameShop(nameShop: string) {
    return this.http.get(`${config.apiUrl}/phones` + nameShop);
  }

  getByUrl(url: string) {
    return this.http.get(`${config.apiUrl}/phones` + url);
  }

  getPaginationPhones(num, brand, min, max, sort) {
    return this.http.post(`${config.apiUrl + '/phonesPagination'}`, {
      num: `${num}`,
      brand: `${brand}`, min: `${min}`, max: `${max}`, sort: `${sort}`
    });
  }


  getPhoneById(id) {
    return this.http.post(`${config.apiUrl + '/phoneById'}`, {id: `${id}`});
  }

  getPhoneAdminById(id) {
    return this.http.post(`${config.apiUrl + '/phoneAdminById'}`, {id: `${id}`});
  }

  getShopsPhone(id) {
    return this.http.post(`${config.apiUrl + '/shops'}`, {id: `${id}`})
  }

  postFile(fileToUpload: File, id: string, shop: string) {
    let params = new HttpParams();
    const endpoint = config.apiUrl + '/image';
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
    formData.append('id', JSON.stringify(id));
    formData.append('shop', JSON.stringify(shop));
    const options = {
      params: params,
      reportProgress: true
    };
    return this.http.post(endpoint, formData, options);
  }

  deleteImgPhone(id: string, shop: string, img: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        id: id,
        shop: shop,
        img: img
      }
    };
    return this.http.delete(`${config.apiUrl}/imageAdmin`, options);

  }

}
