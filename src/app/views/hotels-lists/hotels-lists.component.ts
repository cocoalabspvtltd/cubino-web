import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageServiceService } from '../../services/storage-service.service';
@Component({
  selector: 'app-hotels-lists',
  templateUrl: './hotels-lists.component.html',
  styleUrls: ['./hotels-lists.component.scss'], // Corrected property name
})
export class HotelsListsComponent implements OnInit {
  loading = false;
    errorMsg1: string = '';
    hotels:any[]=[];  
    city: any = null;
    cityData: string | null = null;
    currentPage: number = 1;
    totalPages: number = 3; 
    pages: number[] = [];
    hotelData: any;
    todayDate: any;
    searchForm: any;
    availableRooms: { value: number, label: string }[] = [];
    filterData: any;
    filterDatas: any;
    data: any;
    startDate: any;
    guest_count: any;
    room_limit: any;
    start_date: any;
    end_date: any;
    page: number = 1;  // For current page
    itemsPerPage: number = 5;
  states: any;
  selectedState: number = 0;
  hotel: any;
  subcityData: any
  subcity: any;
  imgUrl:any
  showSearchBox: boolean = false; // Initially hidden
       constructor(
      private apiService: ApiService,
      private router: Router,
      private fb: FormBuilder,private datePipe: DatePipe,
      @Inject(PLATFORM_ID) private platformId: Object,
      public translate:TranslateService,private storageService: StorageServiceService
    ) { }
  
    ngOnInit(): void {
      this.imgUrl='https://cocoalabs.in/Cubino/storage/app/public'
      this.cityData =  this.storageService.getItem('state');    
      if (this.cityData) {
         this.city = JSON.parse(this.cityData); 
        // console.log(this.city)
      }else{
        this.city='';
      }
      this.subcityData =  this.storageService.getItem('subcity'); 
      if (this.subcityData)  {
        this.subcity = JSON.parse(this.subcityData ); 
       // console.log(this.subcity)
     }else{
       this.subcity='';
     }   
     // console.log('hotel',this.hotels) 
      this.loading = true;  
      this.todayDate = new Date().toISOString().split('T')[0];
      //localStorage.setItem('filterData','');
      this.searchForm = this.fb.group({
        location: ['', Validators.required],
        checkin: ['', Validators.required],
        checkout: ['', Validators.required],
        rooms: [1, [Validators.required, Validators.min(1), Validators.max(4)]], // Rooms between 1 and 4
        guests: [1, [Validators.required, Validators.min(1), Validators.max(12)]], // Guests between 1 and 12
      }); 
      this.storageService.removeItem('hotel');
      this.loadFilterData();
     // this.initializeCity();
     // this.stateSearch();
     // this.initializePagination();
     this.updateRoomOptions(1);
    
    }
     private loadFilterData(): void {
      if (this.city=='' &&this.subcity=='') {
        this.data = {city:'', guest_limit: '',room_limit: '',start_date: '',end_date: '' };
      } else if (this.city=='' &&this.subcity!='') { // Ensure `this.subcity` and `this.subcity.name` are defined
        this.data = {
          city: '',
          guest_limit: '',
          room_limit: '',
          start_date: '',
          end_date: '',
          search: '',
          search_places: this.subcity
        };
      } else {
        this.data = {
          city: this.city.id,
          guest_limit: '',
          room_limit: '',
          start_date: '',
          end_date: ''
        };
      }
      
      
      // else if(this.searchForm.value.location==''&&this.city!=""&& this.searchForm.value.checkin==''&& this.searchForm.value.checkout=='' ){
      //   this.data={  city:this.city,guest_limit:'',room_limit:'', start_date:'' ,  end_date: ''} 
      // }
      //console.log('data',this.data)
      this.apiService.getRooms(this.data).subscribe({
        next: (res: any) => {
          //console.log('initial',res)
          this.loading = false;
          if (res.status_code === 200) {
            this.hotels = res.rooms|| [];   
           
        
            this.guest_count=res.guest_count;
            this.room_limit=res.room_count;
            this.start_date=res.start_date;
            this.end_date=res.start_date;
            
          } else {
            this.errorMsg1 = res.message || 'Unknown error occurred.';
          }
        },
        error: (err) => {
          //console.error('HTTP Error:', err);
          //this.errorMsg1 = err;
          this.errorMsg1 = err.message ? err.message.replace('Error:', '').trim() : 'No data found';

        }
      });
     }
    
    // private initializeCity(): void {
    //   this.cityData = localStorage.getItem('state');
    //   if (this.cityData) {
    //     try {
    //       this.city = JSON.parse(this.cityData);
    //       console.log('City:', this.city);
    //     } catch (error) {
    //       console.error('Failed to parse city data from localStorage:', error);
    //     }
    //   } else {
    //     console.warn('No city data found in localStorage');
    //   }
    // }
  
    private stateSearch(): void {
      if (!this.city || !this.city.id) {
       // console.warn('City ID is missing. Cannot fetch hotel data.');
        return;
      }
  
      const filterData = this.filterData;
      if (filterData) {
        const { guests, rooms, checkin, checkout } = filterData;
  
        this.data = {
          city: this.city.id, 
          guest_limit: guests, 
          room_limit: rooms, 
          start_date: this.formatDate(checkin), 
          end_date: this.formatDate(checkout)
        };
        
       // console.log( this.data)
      }
      else{
        this.data={
          city: this.city.id, 
          guest_limit: this.searchForm.value.guests, 
          room_limit:this.searchForm.value.rooms,  
          start_date:this.searchForm.value.checkin , 
          end_date: this.searchForm.value.checkout
        } 
       // console.log('only city',  this.data)
      }
      // this.apiService.getRooms(this.data).subscribe({
      //   next: (res: any) => {
      //     console.log(res)
      //     this.loading = false;
      //     if (res.status_code === 200) {
      //       this.hotels = res.rooms|| [];           
      //       this.guest_count=res.guest_count;
      //       this.room_limit=res.room_count;
      //       this.start_date=res.start_date;
      //       this.end_date=res.start_date;
            
      //     } else {
      //       this.errorMsg1 = res.message || 'Unknown error occurred.';
      //     }
      //   },
      //   error: (err) => {
      //     console.error('HTTP Error:', err);
      //     this.errorMsg1 = 'Failed to fetch hotel data. Please try again later.';
      //   }
      // });
    }
    // private formatDate(date: any): string {
    //   if (!date) return '';
    //   const formattedDate = new Date(date);
    //   return formattedDate.toISOString().split('T')[0]; // YYYY-MM-DD
    // }
  
    private initializePagination(): void {
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  
    viewDetails(hotel: any): void {
      if (isPlatformBrowser(this.platformId)) {
       // console.log('View Details clicked for:', hotel);  
        const roomCount  = this.room_limit;
        const guestCount = this.guest_count;
        const start_date = this.start_date;
        const end_date   = this.end_date;  
        this.storageService.setItem('hotel', hotel);
        hotel.roomCount = roomCount;
        hotel.guestCount = guestCount;
        hotel.start_date = start_date;
        hotel.end_date = end_date;  
        this.storageService.setItem('hotel', JSON.stringify(hotel));
        this.router.navigateByUrl('/room-details');
      } else {
        //console.warn('LocalStorage is not available in this environment.');
      }
    }
  
    bookNow(hotel: any): void {
      if (isPlatformBrowser(this.platformId)) {
       // console.log('View Details clicked for:', hotel);  
        const roomCount  = this.room_limit;
        const guestCount = this.guest_count;
        const start_date = this.start_date;
        const end_date   = this.end_date;
        //console.log('Book Now clicked for:', hotel);
        this.storageService.setItem('hotel', hotel);
        hotel.roomCount = roomCount;
        hotel.guestCount = guestCount;
        hotel.start_date = start_date;
        hotel.end_date = end_date;      
        this.storageService.setItem('hotel', JSON.stringify(hotel));
        this.router.navigateByUrl('/room-details');
      // let data={room_id :,start_date :this.start_date,status:'confirmed'

      //   // output => {
      //   //     "status_code": 201,
      //   //     "success": true,
      //   //     "message": "Room Booked successfully."
      //   // }
      // }
      // this.apiService.booking(this.data).subscribe({
      //   next: (res: any) => {
      //     console.log(res)
      //   }
      //   })
    }
    }
    goToPage(page: number): void {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
    }
  
    onSubmit(): void {
      if (this.searchForm.valid) {
       // console.log('Form Submitted:', this.searchForm.value);
      }
    }

    getStars(rating: number): number[] {
      const numStars = Number(rating); // Convert rating to number
    return new Array(numStars).fill('⭐');
    }




//======================search=========================
onGuestsChange(): void {
  let guests = this.searchForm.get('guests')?.value;
  // Ensure guests does not exceed 12
  if (guests > 12) {
    guests = 12;
    this.searchForm.get('guests')?.setValue(guests); // Automatically set value to 12 if more than 12
  }
  this.updateRoomOptions(guests);
}

// Update room options dynamically based on guest count
updateRoomOptions(guests: number): void {
  // Calculate the minimum number of rooms required
  const roomsNeeded = Math.ceil(guests / 3); // 1 room holds up to 3 guests
  
  // Limit the rooms to a maximum of 4
  const maxRooms = Math.min(roomsNeeded, 4); // Max room count should be 4 rooms
  
  // Set the available rooms array dynamically
  this.availableRooms = Array.from({ length: maxRooms }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} Room${i > 0 ? 's' : ''}`, // Singular/plural label based on the room number
  }));

  // Adjust the room count if it's higher than the available rooms
  const currentRoomCount = this.searchForm.get('rooms')?.value;
  if (currentRoomCount > maxRooms) {
    this.searchForm.get('rooms')?.setValue(maxRooms); // Reset to max available rooms
  }
}
formatDate(date: string): string {
  return this.datePipe.transform(date, 'dd-MM-yyyy') || '';
}
toggleSearchBox(): void {
  this.showSearchBox = !this.showSearchBox;
}

onSearch(): void {
 /// console.log('Search Form Data:', this.searchForm.value);
  if (this.searchForm.valid) {  
    //console.log('Search Form Data:', this.searchForm.value);
    const formData = this.searchForm.value;
    const checkinFormatted = this.formatDate(formData.checkin);
    const checkoutFormatted = this.formatDate(formData.checkout);
   // this.data={ city:'',guest_limit:this.searchForm.value.guests,room_limit:this.searchForm.value.rooms,  start_date:'', end_date:'' ,search:this.searchForm.value.location } 
    // this.data= {search: this.searchForm.value.location,city:'',guest_limit:formData.guests,room_limit:formData.rooms,start_date:checkinFormatted,end_date:checkoutFormatted}
   // console.log('search data',this.data)
    if(this.searchForm.value.location){
      this.data={ city:'',guest_limit:this.searchForm.value.guests,room_limit:this.searchForm.value.rooms,  start_date:checkinFormatted, end_date: checkoutFormatted  ,search:this.searchForm.value.location } 
    }
    this.apiService.getRooms(this.data).subscribe({
      next: (res: any) => {
        //console.log('search',res)
        this.loading = false;
        if (res.status_code === 200) {
          this.hotels = res.rooms|| [];           
          this.guest_count=res.guest_count;
          this.room_limit=res.room_count;
          this.start_date=res.start_date;
          this.end_date=res.start_date;
          
        } else {
          this.errorMsg1 = res.message || 'Unknown error occurred.';
        }
      },
      error: (err) => {
        //.error('HTTP Error:', err);
        //this.errorMsg1 = 'Failed to fetch hotel data. Please try again later.';
        this.errorMsg1 = err.message ? err.message.replace('Error:', '').trim() : 'No data found';
      }
    });
  } else {
   // console.log('Form is invalid');
  }
}
  }
  