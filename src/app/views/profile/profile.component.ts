import { Component } from '@angular/core';
import { StorageServiceService } from '../../services/storage-service.service';
import { ApiService } from '../../services/api.service';

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
  commission: any;
  constructor(private storageService: StorageServiceService,private apiService: ApiService,){

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
this.earnings()
  }
  
  earnings(){
    let agentId=this.userData1.user.user_id;
    console.log('agentId',agentId)
    this.apiService.agentearnings(agentId).subscribe({
      next: (res: any) => {
        console.log('earnings',res)
        this.commission=res.commission;
        
      }
    })
  
  }
  getUserType(role: string | undefined): string {
    switch (role) {
      case 'agent':
        return '🚀 Travel Agent';
      // case 'user':
      //   return '👤 Regular User';
      // case 'admin':
      //   return '🛠️ Administrator';
      default:
        return '👤 User';
    }
  }
}
