import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotels-lists',
  templateUrl: './hotels-lists.component.html',
  styleUrls: ['./hotels-lists.component.scss'], // Corrected property name
})
export class HotelsListsComponent implements OnInit {
  errorMsg1: string = '';
  hotels: any
  city: any = null;
  cityData: string | null = null;
  currentPage: number = 1;
  totalPages: number = 3; // Adjust dynamically based on your API data
  pages: number[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeCity();
    this.stateSearch();
    this.initializePagination();
    localStorage.removeItem('hotel');
  
    let d= localStorage.getItem('hotel')
    console.log(d)
  }

  // Initialize city from localStorage
  private initializeCity(): void {
    this.cityData = localStorage.getItem('state');
    if (this.cityData) {
      try {
        this.city = JSON.parse(this.cityData);
        console.log('City:', this.city);
      } catch (error) {
        console.error('Failed to parse city data from localStorage:', error);
      }
    } else {
      console.warn('No city data found in localStorage');
    }
  }

  // Fetch hotel data based on city ID
  private stateSearch(): void {
    if (!this.city || !this.city.id) {
      console.warn('City ID is missing. Cannot fetch hotel data.');
      return;
    }

    this.apiService.rooms(this.city.id).subscribe({
      next: (res) => {
        console.log('API Response:', res);
        if (res.status_code === 200) {
          this.hotels = res.rooms || [];
          console.log('Number of hotels:', this.hotels[0].aminities);
        } else {
          this.errorMsg1 = res.message || 'Unknown error occurred.';
        }
      },
      error: (err) => {
        console.error('HTTP Error:', err);
        this.errorMsg1 = 'Failed to fetch hotel data. Please try again later.';
      },
    });
  }

  // Initialize pagination
  private initializePagination(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Handle "View Details" button click
  viewDetails(hotel: any): void {
    console.log('View Details clicked for:', hotel);
    localStorage.setItem('hotel',hotel)
    // Implement navigation to details page or show modal
    this.router.navigateByUrl('/room-details')
  }

  // Handle "Book Now" button click
  bookNow(hotel: any): void {
    console.log('Book Now clicked for:', hotel);
    localStorage.setItem('hotel',hotel)
    // Implement booking flow
  }

  // Navigate to a specific page
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    console.log('Navigated to page:', page);
    // Fetch hotels for the current page if pagination is server-side
  }
}
