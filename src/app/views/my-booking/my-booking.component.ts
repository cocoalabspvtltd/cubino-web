import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.scss'
})
export class MyBookingComponent {
 loading = false;
    errorMsg1:any
    hotels: any[]=[];
    city: any = null;
    cityData: string | null = null;
    currentPage: number = 1;
    totalPages: number = 3; 
    pages: number[] = [];
    hotelData: any;
    todayDate: any;

    data: any;
  startDate: any;
  guest_count: any;
  room_limit: any;
  start_date: any;
  end_date: any;
  hotelNames: any;
  page: number = 1;  // For current page
  itemsPerPage: number = 3;
    constructor(
      private apiService: ApiService,
      private router: Router,
      private fb: FormBuilder   ) { }
  
    ngOnInit(): void {   
      this.loading = true;  
      this.todayDate = new Date().toISOString().split('T')[0];   
      this.bookings();
    }
    bookings(): void {  
      this.apiService.getBookedRooms().subscribe({
        next: (res: any) => {
          console.log(this.hotels)
          this.loading = false;
          if (res.status_code === 200) {
              this.hotels = res.booked_rooms;
            console.log(this.hotels )
           // window.location.reload();        
          } else {
           // this.errorMsg1 = res.message || 'Unknown error occurred.';
          }
         
        },
        error: (err) => {
          console.error('HTTP Errors:', err);
          this.errorMsg1 = err.message ? err.message.replace('Error:', '').trim() : 'No data found';
        }
      });
    }
    cancel(id:any){
      console.log(id)
      this.apiService.cancel(id).subscribe({
        next: (res: any) => {
          console.log(res)
          this.loading = false; 
          if (res.status_code === 200) {
              //console.log(this.hotels.room )
          window.location.reload();        
        } else {
         // this.errorMsg1 = res.message || 'Unknown error occurred.';
        }       
        },
        error: (err) => {
          console.error('HTTP Error:', err);
          this.errorMsg1 = err.message ? err.message.replace('Error:', '').trim() : 'No data found';
        }
      });
    }
    
  }
  

