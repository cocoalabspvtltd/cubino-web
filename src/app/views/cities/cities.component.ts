import { Component, ViewChild, AfterViewInit, ElementRef ,ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {DatePipe, JsonPipe} from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss'
})
export class CitiesComponent {
  states: any[] = []; // Initialize the states array
  cities: { [key: string]: any[] } = {}; // Initialize the cities object with key-value pair
  subCities: { [key: string]: any[] } = {}; // Initialize the sub-cities object

  constructor(private Apiservice: ApiService,private router: Router,private fb: FormBuilder,private datePipe: DatePipe) {
  } ngOnInit(): void {
    this.getStates(); // Fetch states and cities when component initializes
  }

  // Fetch states (or popular cities) from the API
  getStates(): void {
    this.Apiservice.getPopularCities().subscribe(
      (res) => {
        // Handle the response
        console.log(res);
        this.states = res.states || [];  // Ensure states array is assigned

        // Fetch cities for each state immediately after states are retrieved
        this.states.forEach(state => {
          this.subcity(state.id); // Fetch cities for each state
        });
      },
      (error) => {
        // Handle errors
        console.error('Error fetching states:', error.message);
      }
    );
  }

  // Fetch cities for a particular state ID
  subcity(id: any): void {
    this.Apiservice.listCities(id).subscribe(
      (res) => {
        // Handle the response
        console.log('sub',res);
        this.cities[id] = res.data || [];  // Store city data by state ID
        
        // Fetch sub-cities for each city in this state
        this.cities[id].forEach(city => {
          // this.fetchSubCities(city.id, id); // Fetch sub-cities for each city
        });
      },
      (error) => {
        // Handle errors
        console.error('Error fetching cities:', error.message);
      }
    );
  }


}