import { Component } from '@angular/core';
import { StorageServiceService } from '../../services/storage-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  loading: any
  user: any
  userData: any;
  agent: any
  userData1: any;
  constructor(private storageService: StorageServiceService){

  }
  ngOnInit(): void {   
    this.loading = true;  
    this.user = this.storageService.getItem('user');
    this.agent = this.storageService.getItem('agent');

    // Parse the data if available, otherwise set to null
    this.userData = this.user ? JSON.parse(this.user) : null;
    this.userData1 = this.agent ? JSON.parse(this.agent) : null;

    console.log('User Data:', this.userData);
    console.log('Agent Data:', this.userData1);

  }
}
