import { Component, ViewChild, AfterViewInit, ElementRef ,ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {DatePipe, JsonPipe} from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TranslateService } from '@ngx-translate/core';
import { StorageServiceService } from '../../services/storage-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  states: any[] = []; // Correct type to hold an array of any objects
  filterForm :any
  selectedCity: any
  cities: { [key: number]: string[] } = {};
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  isDragging = false;
  startX = 0;
  scrollLeft = 0;
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  searchForm: any
  data: any
  availableRooms:any
  errorMsg1: any
  todayDate:any
  startDate:any
 constructor(private Apiservice: ApiService,private router: Router,private fb: FormBuilder,private datePipe: DatePipe,private translate:TranslateService,private storageService: StorageServiceService) {
   this.searchForm = this.fb.group({
    location: ['', Validators.required],
    checkin: ['', Validators.required],
    checkout: ['', Validators.required],
    rooms: [1, [Validators.required, Validators.min(1), Validators.max(4)]], // Rooms between 1 and 4
    guests: [1, [Validators.required, Validators.min(1), Validators.max(12)]], // Guests between 1 and 12
   });
  
 }
ngOnInit(): void { // Corrected lifecycle hook spelling
    this.storageService.setItem('filterData','') ;
    this.storageService.removeItem('state'); 
    this.storageService.removeItem('subcity') 
    this.getStates();  
    this.updateRoomOptions(1);
    this.todayDate = new Date().toISOString().split('T')[0];
    this.startDate=''
}
onGuestsChange(): void {
  let guests = this.searchForm.get('guests')?.value;
  if (guests > 12) {
       guests = 12;
       this.searchForm.get('guests')?.setValue(guests); 
  }
  this.updateRoomOptions(guests);
}
updateRoomOptions(guests: number): void {  
  const roomsNeeded = Math.ceil(guests / 3);  
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
ngAfterViewInit() {
  if (this.scrollContainer) {
    this.setupDragToScroll();
  }
}
getStates(): void { 
  this.Apiservice.getPopularCities().subscribe(
    (res) => {
      // Handle the response
     // console.log(res)
      this.states = res.states;
    },
    // (error) => {
    //   // Handle the error
    //   console.error('Error fetching states:', error.message);
    // }
  );
}
formatDate(date: string): string {
  return this.datePipe.transform(date, 'dd-MM-yyyy') || '';
}
subcity(id:any){
  this.Apiservice.listCities(id).subscribe(
    (res) => {
      // Handle the response
      //console.log(res)
      this.cities[id] = res.data;
      //console.log( this.cities )
    },
    // (error) => {
    //   // Handle the error
    //   console.error('Error fetching states:', error.message);
    // }
  );
}
hideCities(stateId: number): void {
  // Optionally, you can clear the cities list when the hover ends
  // Here we just clear the cities for the given stateId to hide the list
  delete this.cities[stateId];
}
setupDragToScroll() {
  const container = this.scrollContainer.nativeElement;
  container.addEventListener('mousedown', (e: MouseEvent) => {
    this.isDragging = true;
    this.startX = e.pageX - container.offsetLeft;
    this.scrollLeft = container.scrollLeft;
  });

  container.addEventListener('mouseleave', () => {
    this.isDragging = false;
  });
  container.addEventListener('mouseup', () => {
    this.isDragging = false;
  });

  container.addEventListener('mousemove', (e: MouseEvent) => {
    if (!this.isDragging) return;
    const x = e.pageX - container.offsetLeft;
    const scroll = (x - this.startX) * 2;  // Speed of scroll
    container.scrollLeft = this.scrollLeft - scroll;
  });
}
//==============================================state name===================================================//
state_search(state:any){  
  this.storageService.removeItem('state');   
  if(state!=''){
    const arrayJson1 = JSON.stringify(state);
    this.storageService.setItem('state',  arrayJson1 );
    //console.log('state',state);  
    this.router.navigateByUrl('/hotels') 
  }
  
    // this.Apiservice.city_hotels(id).subscribe(
    //   (res) => {
    //     // Handle the response
    //     console.log(res)
    //   })
}
state_city(name:any){
 // console.log(name)
 this.storageService.removeItem('state');  
 this.storageService.removeItem('subcity');   
  if(name!=''){
    const arrayJson1 = JSON.stringify(name);
    this.storageService.setItem('subcity',  arrayJson1 );
    //console.log('state',state);  
    this.router.navigateByUrl('/hotels') 
  }
}
///==========================================SearchForm======================================================//
onSubmit(): void {
  if (this.filterForm.valid) {
    const formData = this.filterForm.value;
    console.log('Form Submitted:', formData);
  } else {
    console.log('Form is not valid');
  }
}
//==========================================================================================================//
onSearch(): void {
  // Check if the form is valid
  console.log('search')
  if (this.searchForm.valid) {
    const formData = this.searchForm.value;

    // Format check-in and check-out dates
    const checkinFormatted = this.formatDate(formData.checkin);
    const checkoutFormatted = this.formatDate(formData.checkout);

    // Prepare data for storage
    this.data = {
      city: 3,  // Replace 3 with a dynamic city value if needed
      guest_limit: formData.guests,
      room_limit: formData.rooms,
      start_date: checkinFormatted,
      end_date: checkoutFormatted,
    };

    // Store the filter data in localStorage
    this.storageService.setItem('filterData', JSON.stringify(this.data));
    // Retrieve the stored data to confirm it was saved
    const storedData = this.storageService.getItem('filterData');
    if (storedData) {
      // Navigate to the hotels page
      this.router.navigateByUrl('/hotels');
    } else {
      console.error('Failed to store filter data in localStorage.');
    }
  } else {
    // If form is invalid, display an error message
    console.log('Form is invalid');
    this.errorMsg1 = "Please fill all the fields";
  }
}
}