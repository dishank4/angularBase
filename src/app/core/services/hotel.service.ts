import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { APIURL } from 'src/app/constant';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private apiService: ApiService) { }

  getPostBookingData(){
    return this.apiService.get(`${APIURL.BOOKINGLIST}?from_date=2019-12-01`);
  }
}
