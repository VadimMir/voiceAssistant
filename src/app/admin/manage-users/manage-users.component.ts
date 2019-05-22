import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

import {AuthenticationService} from '../../_services/authentication.service';
import {User} from '../../_models/user';
import {UserService, AlertService} from '../../_services';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css', './manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  selectedUser: any;
  users: User[] = [];
  registerForm: FormGroup;
  submitted = false;
  loading = false;


  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private formBuilder: FormBuilder,
              private alertService: AlertService,) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loadAll();

  }

  loadAll() {
    this.userService.getAll()
      .subscribe((userAll => {
        this.users = userAll;
      }));
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(() => {
        this.loadAll()
      });
  }


  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);

        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }

  usersUpdate(user: any) {
    this.selectedUser = user
  }

  updateUser() {
    this.userService
      .update(this.selectedUser)
      .subscribe(() => {
        this.loadAll()
      });

  }


}
