import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpService } from '../../shared-service/http.service';

export interface IBike {
  id?: number;
  image: string;
  price: number;
  quantity: number;
  description: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  bikes: Array<IBike> = [];
  myName = '';
  cars = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private http: HttpService
  ) { }

  async ngOnInit() {
    await this.refresh();
    //  this.updateCar('card/id/1', {make: 'ford', model: 'Fiesta'});
    // this.createCar ('car', {make: 'Tesla', model: 'X'});

  }
  async refresh() { this.cars = await this.getCars('car'); }

  async getCars(path: string) {
    const resp = await this.http.get(path);
    console.log('resp from GetCaRz', resp);
    return resp;
  }
  async createCar() {
    const car = {
      make: null,
      model: null,
      year: null
    };
    const resp = await this.http.post('car', car);
    console.log('resp from Createeee', resp);
    if (resp) {
      // this.refresh();
      this.cars.unshift(resp);
    } else { this.toastService.showToast('danger', 3000, 'Car create failed!');}
      return resp;
  }
  async updateCar(car: any) {
    const resp = await this.http.put('car/id${car.id}', car);
    console.log('resp from Puuuutttt', car);
    if (resp) {
      this.toastService.showToast('success', 3000, 'Car updated successfully!');
    }
    return resp;

  }
  async removerCar(car: any, index: number) {
    const resp = await this.http.delete('car/id${car.id}');
    console.log('resp from Deleteeee', car);
    if (resp) {
      this.toastService.showToast('danger', 3000, 'Delete car failed!');
    }
    return resp;
}
