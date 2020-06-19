import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OtpService {

  constructor(private http: HttpClient) { }

  BASE_URL = "https://2factor.in/API/V1/";
  API_KEY = "" // Generate Your Own API KEY on Their Website

  response: {}

  sendOTP(phoneNumber) {
    return this.http.get(this.BASE_URL + this.API_KEY + '/SMS/+91' + phoneNumber + '/AUTOGEN')
  }

  verifyOTP(sessionID, OTP) {
    return this.http.get(this.BASE_URL + this.API_KEY + '/SMS/VERIFY/' + sessionID + '/' + OTP)
  }

}
