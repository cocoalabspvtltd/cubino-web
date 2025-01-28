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
  constructor(private storageService: StorageServiceService){

  }
  ngOnInit(): void {   
    this.loading = true;  
    this.user=  this.storageService.getItem('user');
   // this.userData = JSON.parse(this.user) 
    console.log(this.userData)
  }
}
