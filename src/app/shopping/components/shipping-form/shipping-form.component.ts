import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './../../../shared/services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { AppUser } from 'shared/models/app-user';
import { OtpService } from './../../services/otp.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Order } from 'shared/models/order';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;

  shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    mobile: '',
    pinCode: '',
    state: ''
  };
  subscription: Subscription;
  userId: string;

  OTP;
  otpStatus: {}
  otpError = '';
  otpSent: boolean;
  otpVerified = '';

  cart$: Observable<ShoppingCart>;
  appUser: AppUser;

  states = ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu', 'Jharkhand', 'Karnataka', 'Kashmir', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttarakhand', 'Uttar Pradesh', 'West Bengal']



  constructor(
    private orderService: OrderService,
    private auth: AuthService,
    private router: Router,
    private otpService: OtpService,
    private shoppincartService: ShoppingCartService,
    private db: AngularFireDatabase
  ) { }


  async ngOnInit() {
    this.subscription = this.auth.user$.subscribe(user => this.userId = user.uid);

    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppincartService.getCart();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.db.object('/users/' + this.appUser.$key).update({ wallet: this.appUser.wallet - this.cart.totalPrice });
    this.router.navigate(['/order-success', result.key])
  }

  async sendOTP(phoneNumber) {
    await this.otpService.sendOTP(phoneNumber).subscribe(response => {
      this.otpStatus = response;
      this.otpSent = true;
    },
      error => {
        this.otpError = 'Something went Wrong, Please Try Again';
      }
    )
  }

  verifyOTP(OTP) {
    this.otpService.verifyOTP(this.otpStatus['Details'], OTP).subscribe(
      response => {
        if (response['Details'] === 'OTP Matched') {
          this.otpVerified = 'OTP is Verified Successfully !';
          this.otpError = '';
        }
      },
      error => {
        this.otpError = 'Invalid OTP, Please Re-enter Valid OTP';
      }
    )
  }

  login() {
    this.auth.login();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
