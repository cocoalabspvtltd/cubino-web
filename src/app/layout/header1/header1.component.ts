import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageServiceService } from '../../services/storage-service.service';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrl: './header1.component.scss'
})
export class Header1Component {
 isScrolled = false; // Tracks the scroll state
  isMenuOpen = false; // Tracks the state of the mobile menu
  searchForm: any
  availableRooms: { value: number, label: string }[] = [];
  hotels: any;
  errorMsg1: any;
  data:any
  isUserDropdownOpen: boolean = false;
  loginToken: any
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; // Toggles the menu state
   // console.log( this.isMenuOpen)
  }
constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
    ,@Inject(PLATFORM_ID) private platformId: Object,
    private datePipe: DatePipe,
    public translate:TranslateService,
    private storageService: StorageServiceService
  ) {
    this.translate.addLangs(['en','es','fr','la']);
    this.translate.setDefaultLang('en');
    this.translate.use('en')
  }
  closeMenu(): void {
    this.isMenuOpen = false; // Closes the menu
  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 50; // Add "scrolled" class after scrolling 50px
  }
  ngOnInit(): void {
    this.loginToken =  this.storageService.getItem('token');
   // console.log(this.loginToken)
   this.storageService.setItem('filterData','');
    this.searchForm = this.fb.group({
      location: ['', Validators.required],
      checkin: ['', Validators.required],
      checkout: ['', Validators.required],
      rooms: [1, [Validators.required, Validators.min(1), Validators.max(4)]], // Rooms between 1 and 4
      guests: [1, [Validators.required, Validators.min(1), Validators.max(12)]], // Guests between 1 and 12
    });

  // Set available rooms based on the default guest count
 
  this.updateRoomOptions(1);
}
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
onSearch(): void {
 // console.log('Search Form Data:', this.searchForm.value);
  if (this.searchForm.valid) {  
    //console.log('Search Form Data:', this.searchForm.value);
    const formData = this.searchForm.value;
    const checkinFormatted = this.formatDate(formData.checkin);
    const checkoutFormatted = this.formatDate(formData.checkout);
   // console.log('Search Form Data:', formData);
    // Perform search action, e.g., API call or redirect;

    this.data= {city :3,guest_limit:formData.guests,room_limit:formData.rooms,start_date:checkinFormatted,end_date:checkoutFormatted}
    //console.log(this.data)
    this.storageService.setItem('filterData',JSON.stringify(this.data)) ;
    const storedData =  this.storageService.getItem('filterData');
    if (storedData) {
      this.router.navigateByUrl('/hotels')
    }
   // this.router.navigateByUrl('/hotels')
    // this.apiService.rooms(data).subscribe({
    //   next: (res:any) => {
    //     console.log('API Response:', res);
    //     if (res.status_code === 200) {
    //       this.hotels = res.rooms;
    //       localStorage.setItem('hotel',hotel) ;
    //       
    //    //   console.log('Number of hotels:', this.hotels[0].aminities);
    //     } else {
    //       this.errorMsg1 = res.message || 'Unknown error occurred.';
    //     }
    //   },
    //   error: (err) => {
    //     console.error('HTTP Error:', err);
    //     this.errorMsg1 = 'Failed to fetch hotel data. Please try again later.';
    //   },
    // });
  } else {
    //console.log('Form is invalid');
  }
}
toggleUserDropdown(): void {
  this.isUserDropdownOpen = !this.isUserDropdownOpen;
}
logout(){
  this.storageService.clear();
  this.router.navigateByUrl('/login')
  this.apiService.logout().subscribe( (res) => {
  // console.log(res)
  })
    
}
ChangeLang(e:any){
  //console.log(selectedLanguage)
  const selectedLanguage = e.target.value;
  //alert(selectedLanguage );
  //console.log(selectedLanguage)
  localStorage.setItem('lang',selectedLanguage);
  this.translate.use(selectedLanguage)
  }
}