import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { StorageServiceService } from '../../services/storage-service.service';

@Component({
  selector: 'app-hotels-list-details',
  templateUrl: './hotels-list-details.component.html',
  styleUrl: './hotels-list-details.component.scss'
})
export class HotelsListDetailsComponent {
  roomTitle: any
  roomDescription:any
  discount:any
  hotelData:any
  hotel: any;
  aminities: any;
  hotel_policies: any;
  price: any;
  date:any
  guest:any
  rooms:any
  guestCount: any;
  roomCount: any;
  start_date: any;
  end_date: any;
  images: any;
 constructor(
    private apiService: ApiService,private location: Location,private sanitizer: DomSanitizer,private storageService: StorageServiceService,
    private router: Router) { }

  ngOnInit(): void {  
   this.details();
  }
  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 }
    }
  }
  goBack() {
    this.location.back();
  }
  details(){
    const hotelData = this.storageService.getItem('hotel');
    this.hotelData = hotelData ? JSON.parse(hotelData) : null;
    console.log('this.hotelData:', this.hotelData);
    this.roomTitle                 = this.hotelData.hotel_name;
    this.roomDescription           = this.hotelData.description;
    this.aminities                 = this.hotelData.amenities;
   // this.hotel_policies            = this.hotelData.hotel_policies;   
    const unsafePolicies = this.hotelData.hotel_policies;
    this.hotel_policies = this.sanitizer.bypassSecurityTrustHtml(unsafePolicies);
     this.price                     = this.hotelData.price;  
     this.date                     = this.hotelData.date;  
     this.guestCount               = this.hotelData.guestCount;
     this.roomCount                = this.hotelData.roomCount; 
     this.start_date = this.parseDate(this.hotelData.start_date);
    this.end_date = this.parseDate(this.hotelData.end_date);
   this.images=this.hotelData.room_images;
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
  getStars(rating: number): number[] {
    const numStars = Number(rating); // Convert rating to number
  return new Array(numStars).fill('⭐');
  }
  
  parseRoomImages(images: string): string[] {
    try {
      return JSON.parse(images) || [];
    } catch (error) {
      console.error('Error parsing room images:', error);
      return [];
    }
  }
  submit(){
    this.router.navigateByUrl('/booking');
  }
}
