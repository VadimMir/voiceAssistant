import {Component, OnInit} from '@angular/core';
import {PhoneService} from '../../_services/phone.service';
import {Router} from '@angular/router';
import {Phone} from '../../_models/phone'

@Component({
  selector: 'app-manage-phone',
  templateUrl: './manage-phone.component.html',
  styleUrls: ['./manage-phone.component.css']
})
export class ManagePhoneComponent implements OnInit {
  phones: any;
  phoneId: string = sessionStorage.getItem('phoneAdminId');
  selectedPhone: any;
  imageUrl: string = '../../../assets/images/default-image.png';
  fileToUpload: File = null;

  constructor(private phoneService: PhoneService,
              private router: Router) {
  }

  ngOnInit() {
    console.log(this.phoneId);
    this.getPhone();
    this.readyInput();
  }

  getPhone() {
    this.phoneService
      .getPhoneAdminById(this.phoneId)
      .subscribe((phone) => {
        this.phones = phone;
      });
  }


  deletePhone(id: string, shop: string) {
    this.phoneService.deletePhone(id, shop).subscribe(() => {
      this.router.navigate(['/admin/manage-phones'])
    })
  }


  updatePhone() {
    this.phoneService
      .updatePhone(this.phones)
      .subscribe((phone) => {
        this.phones = phone
      });

  }

  deleteImg(id, shop, img) {
    this.phoneService.deleteImgPhone(id, shop, img)
      .subscribe((phone) => {
        this.phones = phone;
      })
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }


  uploadFileToActivity(Image) {
    this.phoneService.postFile(this.fileToUpload, this.phones._id, this.phones.nameShop).subscribe(event => {
      this.imageUrl = '../../../assets/images/default-image.png';
      Image.value = null;
    }, error => {
      console.log(error);
    });
  }


  readyInput() {
    let inputs = document.querySelectorAll('.inputfile');
    Array.prototype.forEach.call(inputs, function (input) {
      let label = input.nextElementSibling,
        labelVal = label.innerHTML;

      input.addEventListener('change', function (e) {
        // console.log(this.files);
        let fileName = '';
        if (this.files && this.files.length > 1) {
          fileName = (this.getAttribute('data-multiple-caption') || '')
            .replace('{count}', this.files.length);
        } else {
          fileName = e.target.value.split('\\').pop();
        }
        if (fileName) {
          label.querySelector('span').innerHTML = fileName;
        } else {
          label.innerHTML = labelVal;
        }
      });
    });
  }
}
