import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cancellations',
  templateUrl: './cancellations.component.html',
  styleUrl: './cancellations.component.scss'
})
export class CancellationsComponent {
  loading = false;
  errorMsg1: string = '';
  hotels: any;
  city: any = null;
  cityData: string | null = null;
  page: number = 1;  // For current page
  itemsPerPage: number = 3;
  hotelData: any;
  todayDate: any;
  cancelledRooms: any[]=[]
  data: any;
startDate: any;
guest_count: any;
room_limit: any;
start_date: any;
end_date: any;
hotelNames: any;
 
  errorMsg: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder   ) { 
      // this.cancelledRooms = [
      //   {id: 9, user_id: 23, room_id: 2, start_date: '2025-01-15', end_date: '2025-01-15'},
      //   {id: 10, user_id: 23, room_id: 2, start_date: '2025-01-15', end_date: '2025-01-15'},
      //   {id: 11, user_id: 23, room_id: 2, start_date: '2025-01-15', end_date: '2025-01-15'},
      //   {id: 12, user_id: 23, room_id: 2, start_date: '2025-01-15', end_date: '2025-01-15'}
      // ];
    }
    

  ngOnInit(): void {   
    this.loading = true;  
    this.todayDate = new Date().toISOString().split('T')[0];   
    this.cancel();
  }
  
  cancel(): void {  
    this.apiService.getCancelledRooms().subscribe({
      next: (res: any) => {
        // Successfully received the response, log it
        console.log('Cancelled Rooms:', res);
        if (res.status_code === 200) {
          // Process the response if status is OK (example)
          this.cancelledRooms= res.cancelled_rooms  // Assuming 'rooms' is part of the response          
         console.log('Cancelled Rooms Type:', typeof this.cancelledRooms);
        } else {
          this.errorMsg = res.message || 'Failed to fetch cancelled rooms.';
          
        }
      },
      error: (err: any) => {
        // Handle error if request fails
        console.error('HTTP Error:', err);
        this.errorMsg1 = err.message ? err.message.replace('Error:', '').trim() : 'No data found';

      }
    });
      
      // next: (res: any) => {
      //   console.log(this.hotels)
      //   this.loading = false;
      //   if (res.status_code === 200) {
      //     this.hotels = res.booked_rooms;
      //     //console.log(this.hotels.room )            
      //   } else {
      //     this.errorMsg1 = res.message || 'Unknown error occurred.';
      //   }
      // },
      // error: (err) => {
      //   console.error('HTTP Errors:', err);
      //   this.errorMsg1 = err;
      // }
   
  }

    // Function to parse room_images JSON string into an array of strings
    parseRoomImages(images: string): string[] {
      try {
        return JSON.parse(images) || [];
      } catch (error) {
        console.error('Error parsing room images:', error);
        return [];
      }
    }
  
    // Helper function to get the first image URL
    getFirstRoomImage(images: string): string {
      const parsedImages = this.parseRoomImages(images);
      return parsedImages.length > 0 ? parsedImages[1] : '';
    }
   
}