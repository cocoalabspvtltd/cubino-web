import { Component } from '@angular/core';

@Component({
  selector: 'app-hotels-list-details',
  templateUrl: './hotels-list-details.component.html',
  styleUrl: './hotels-list-details.component.scss'
})
export class HotelsListDetailsComponent {
  roomTitle: string = 'Premium King Room';
  roomDescription: string = `We’re halfway through the summer, but while plenty of people are kicking back and enjoying their vacations, the social media development teams likely aren’t doing the same. In the past two weeks alone, we’ve seen four big new updates that can directly impact the social marketing campaigns of hotels, resorts, and other businesses in the hospitality industry. Let’s take a close look at each one.`;
  
  otherFacilities: string[] = [
    'Takami Bridal Attire',
    'Esthetic Salon',
    'Multilingual staff',
    'Dry cleaning and laundry',
    'Credit cards accepted',
    'Rent-a-car',
    'Reservation & confirmation',
    'Babysitter upon request',
    '24-hour currency exchange',
    '24-hour Manager on Duty'
  ];

  additionalFacilities: string[] = [
    'Air Conditioning',
    'Cable TV',
    'Free drinks',
    'Unlimited Wifi',
    'Restaurant quality',
    'Service 24/24',
    'Gym Centre',
    'Spa & Wellness'
  ];

  popularFacilities = [
    { name: 'Air Conditioning', icon: 'assets/img/rooms/details/facilities/fac-1.png' },
    { name: 'Cable TV', icon: 'assets/img/rooms/details/facilities/fac-2.png' },
    { name: 'Free drinks', icon: 'assets/img/rooms/details/facilities/fac-3.png' },
    { name: 'Unlimited Wifi', icon: 'assets/img/rooms/details/facilities/fac-4.png' },
    { name: 'Restaurant quality', icon: 'assets/img/rooms/details/facilities/fac-5.png' },
    { name: 'Service 24/24', icon: 'assets/img/rooms/details/facilities/fac-6.png' },
    { name: 'Gym Centre', icon: 'assets/img/rooms/details/facilities/fac-7.png' },
    { name: 'Spa & Wellness', icon: 'assets/img/rooms/details/facilities/fac-8.png' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
