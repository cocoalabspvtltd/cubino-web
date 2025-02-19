import { Component } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { StorageServiceService } from '../../services/storage-service.service';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  roomCount: any;
  guestCount: any;
  price: any;
  date: any;
  hotel_policies: any;
  aminities: any;
  roomDescription: any;
  roomTitle: any;
  hotelData: any;
  loginToken:any
  user:any
  userData: any;
  start_date: any;
  end_date: any;
  room_id: any;
  agent:any
  userData1: any;

   constructor(
      private apiService: ApiService,private location: Location,private datePipe: DatePipe,private storageService: StorageServiceService,
      private router: Router) { }
  ngOnInit(): void {  
    this.details();
     this.loginToken =  this.storageService.getItem('token');
     this.user=  this.storageService.getItem('user');
     this.agent = this.storageService.getItem('agent');

     // Parse the data if available, otherwise set to null
     this.userData = this.user ? JSON.parse(this.user) : null;
     this.userData1 = this.agent ? JSON.parse(this.agent) : null; 
     
   }
   details(){
    const hotelData = this.storageService.getItem('hotel');
    this.hotelData = hotelData ? JSON.parse(hotelData) : null;
  //  console.log('this.hotelData:', this.hotelData);
    this.roomTitle                 = this.hotelData.hotel_name;
    this.roomDescription           = this.hotelData.description;
    this.aminities                 = this.hotelData.aminities;
    this.hotel_policies            = this.hotelData.hotel_policies;   
     this.price                    = this.hotelData.price;  
     this.date                     = this.hotelData.date;  
     this.guestCount               = this.hotelData.guestCount;
     this.roomCount                = this.hotelData.roomCount;
     this.start_date               =  this.hotelData.start_date
     this.end_date                 =  this.hotelData.end_date
     this.room_id                  =  this.hotelData.room_id
  }


  goBack() {
    this.location.back();
  }
  formatDate(date: string | Date): string {
    // Directly format the ISO string or Date object
    return this.datePipe.transform(date, 'dd-MM-yyyy') || '';
  }
  
   /**
   * Parse a date string into a Date object.
   * @param dateString - The date string to parse.
   * @returns Parsed Date object or null if invalid.
   */
   parseDate(dateString: string): Date | null {
    // Attempt to parse ISO 8601 format
    if (!isNaN(Date.parse(dateString))) {
      return new Date(dateString);
    }

    // Attempt to parse custom format dd-MM-yyyy
    const customDateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (customDateRegex.test(dateString)) {
      const [day, month, year] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day); // Month is 0-indexed
    }

    // Invalid date format
    console.error('Invalid date format:', dateString);
    return null;
  }
  book(){ 
    // const checkinFormatted =  this.parseDate(this.start_date) ;     
    //  const checkoutFormatted = this.parseDate(this.end_date) ;
    // let data={room_id : this.room_id,start_date :checkinFormatted,end_date :checkoutFormatted ,status:'confirmed',guest_count: this.guestCount,room_count:this.roomCount}

    //     // output => {
    //     //     "status_code": 201,
    //     //     "success": true,
    //     //     "message": "Room Booked successfully."
    //     // }
    //  // }
    const checkinFormatted = this.parseDate(this.start_date);
   const checkoutFormatted = this.parseDate(this.end_date);
    if (checkinFormatted && checkoutFormatted) {
      const formattedCheckin = this.formatDate(checkinFormatted);
      const formattedCheckout = this.formatDate(checkoutFormatted);
    
      let data = {
        room_id: this.room_id,
        start_date: formattedCheckin,
        end_date: formattedCheckout,
        status: 'confirmed',
        guest_count: this.guestCount,
        room_count: this.roomCount,
      };   
     console.log('data',data)
      this.apiService.booking(data).subscribe({
        next: (res: any) => {
          console.log('booking',res)
          if (res.status_code === 201) {
               this.router.navigateByUrl('/bookings')
          }
        }
        })
      }
  }
}
