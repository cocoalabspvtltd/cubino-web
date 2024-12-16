import { Component } from '@angular/core';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss'
})
export class HotelListComponent {
  hotels = [
    {
      name: 'Super Townhouse Ramamurthy Nagar',
      price: 997,
      location: 'Bangalore',
      rating: 4.3,
      services: ['Free Wi-Fi', 'Electric Kettle', 'Daily Housekeeping'],
    },
    // Add more hotels here
  ];

  filteredHotels = [...this.hotels];
  searchQuery = '';

  constructor() {}

  ngOnInit(): void {}

  applyFilter(filters: any): void {
    this.filteredHotels = this.hotels.filter((hotel) => {
      // Apply filters here based on the filters object
      return hotel.price >= filters.minPrice && hotel.price <= filters.maxPrice;
    });
  }

  searchHotels(): void {
    this.filteredHotels = this.hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
