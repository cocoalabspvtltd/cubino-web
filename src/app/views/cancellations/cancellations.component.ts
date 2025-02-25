import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cancellations',
  templateUrl: './cancellations.component.html',
  styleUrls: ['./cancellations.component.scss']
})
export class CancellationsComponent implements OnInit {
  loading = false;
  errorMsg1: string = '';
  hotels: any;
  city: any = null;
  cityData: string | null = null;
  page: number = 1;
  itemsPerPage: number = 3;
  hotelData: any;
  todayDate: string = '';
  cancelledRooms: any[] = [];
  startDate: any;
  guest_count: any;
  room_limit: any;
  start_date: any;
  end_date: any;
  hotelNames: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loading = true;
    this.todayDate = new Date().toISOString().split('T')[0]; 
    this.cancel();
  }

  cancel(): void {
    this.cancelledRooms = [];
    this.apiService.getCancelledRooms().subscribe({
      next: (res: any) => {
        console.log('Cancelled Rooms:', res);
        if (res?.status_code === 200) {
          this.cancelledRooms = res.cancelled_rooms || [];
        } else if (res?.status_code === 404) {
          this.cancelledRooms = [];
          this.errorMsg1 = 'No data found';
        } else {
          this.cancelledRooms = [];
        }
      },
      error: (err: any) => {
        console.error('Error fetching cancelled rooms:', err);
        this.cancelledRooms = [];
        this.errorMsg1 = err?.message?.replace('Error:', '').trim() || 'Error fetching data';
      }
    });
  }

  // Function to parse room_images JSON string into an array
  parseRoomImages(images: string): string[] {
    try {
      return JSON.parse(images) || [];
    } catch (error) {
      console.error('Error parsing room images:', error);
      return [];
    }
  }

  // Get the first image URL safely
  getFirstRoomImage(images: string): string {
    const parsedImages = this.parseRoomImages(images);
    return parsedImages.length > 0 ? parsedImages[0] : ''; // Fixed indexing issue
  }
}
