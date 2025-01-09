import { Component, ViewChild, AfterViewInit, ElementRef ,ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {JsonPipe} from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  states: any[] = []; // Correct type to hold an array of any objects
  filterForm : FormGroup
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
  
constructor(private Apiservice: ApiService,private router: Router,private fb: FormBuilder) {
  this.filterForm = this.fb.group({
    location: ['', Validators.required],
    checkIn: ['', Validators.required],
    checkOut: ['', Validators.required],
    person: ['', Validators.required]
  });
}
ngOnInit(): void { // Corrected lifecycle hook spelling
  this.getStates();  
}
ngAfterViewInit() {
  if (this.scrollContainer) {
    this.setupDragToScroll();
  }
}
getStates(): void { 
  this.Apiservice.Popular_Cities().subscribe(
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
subcity(id:any){
  this.Apiservice.list_Cities(id).subscribe(
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
  localStorage.removeItem('state');   
  if(state!=''){
    const arrayJson1 = JSON.stringify(state);
    localStorage.setItem('state',  arrayJson1 );
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
}
