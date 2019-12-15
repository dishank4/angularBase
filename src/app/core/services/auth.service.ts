import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';
import { ApiService } from './api.service';
import { APIURL } from 'src/app/constant';


@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private apiService:ApiService) {
    }

    login(username: string, password: string) {
        return this.apiService.post(APIURL.LOGIN,{"userName": username , "password": password});
    }

    logout() {
        this.clearUserSession()
    }

    storUserSession(data){
        localStorage.setItem("token" , data.token);
        localStorage.setItem("userName" , data.userName);
    }

    clearUserSession(){
        localStorage.setItem("token","")
        localStorage.setItem("userName","")
    }

    isAuthenticated(){
        return localStorage.getItem("token") !== "" ? true : false;
    }
}