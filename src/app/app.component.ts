import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageServiceService } from './services/storage-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  //standalone: true, // Mark as standal
})
export class AppComponent {
  title = 'cubino';
  constructor(private translate:TranslateService,private storageService: StorageServiceService) { 
   
  }
}
