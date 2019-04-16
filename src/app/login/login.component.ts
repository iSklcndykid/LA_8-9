import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpService } from '../../shared-service/http.service';
export interface IUser {
  id?: number;
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser = {};
  loggedIn = false;
  someVar: boolean;
  user: IUser = { username: null, password: null };
  constructor(
    private router: Router,
    private toastService: ToastService,
    private http: HttpService
  ) {
  }

  ngOnInit() {
    const token = localStorage.getItem('id_token')
    console.log('from login token:', token);
    if (token == null) {
      this.loggedIn = false;
      this.router.navigate(['']);
    } else { this.loggedIn = true; }
  }
  async login(user: IUser) {
    console.log('from login', user);
    // const payload = {
    //   email: 'joe@bob.com',
    //   password: 'yolo'
    // };

    const resp: any = await this.http.post('user/login', user);
    console.log('resp from login()', resp);
    if (resp && resp.token) {
      localStorage.setItem('id_token', resp.token);
      this.toastService.showToast('success', 3000, 'Login Succes.');
      this.router.navigate(['']);
    } else {
      this.toastService.showToast('danger', 3000, 'Login Failed.');
    }

  }

}
