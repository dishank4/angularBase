import { Component, OnInit } from '@angular/core';
import { Column, GridOption } from 'angular-slickgrid';
import { HotelService } from 'src/app/core/services/hotel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  columnDefinitions: Column[] = [];
  gridOptions: GridOption = {};
  dataset: any[] = [];


  constructor(private hotelService: HotelService) { }

  ngOnInit() {
    this.prepareGrid();
  }

  prepareGrid() {
    this.hotelService.getPostBookingData().subscribe((res) => {
      this.dataset = res['data'];
    });
    this.columnDefinitions = [
      { id: 'code', name: 'Code', field: 'code', sortable: true , dataKey:'code'},
      { id: 'created_at', name: 'Created At', field: 'created_at', sortable: true },
      { id: 'checkin', name: 'Check In', field: 'checkin', sortable: true },
      { id: 'checkout', name: 'Check Out', field: 'checkout' },
      { id: 'hotel_code', name: 'Hotel Code', field: 'hotel_code' },
      { id: 'currency', name: 'Currency', field: 'currency' },
      { id: 'price', name: 'Price', field: 'price' },
      { id: 'status', name: 'Status', field: 'status' },
    ];

    this.gridOptions = {
      enableAutoResize: true,
      enableSorting: true,
      datasetIdPropertyName:'code'
    };

    // fill the dataset with your data
    // this.dataset = [ 
    //   { id: '1' ,title: 'title1', duration: 'Title', percentComplete: 'title', start: 'true' , finish: 'ssdfsdf' },
    //  ];
  }

}
