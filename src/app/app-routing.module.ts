import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.component';
import { HotelListComponent } from './views/user-dashboard/hotel-list/hotel-list.component';
import { AboutComponent } from './views/about/about.component';
import { ContactComponent } from './views/contact/contact.component';
import { HotelCardComponent } from './views/user-dashboard/hotel-card/hotel-card.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent}, 
  { path: 'contact', component: ContactComponent



  }, 
  { path: 'home', component: UserDashboardComponent,
    children: [
      // { path: 'profile', component: ProfileComponent },
      { path: 'rooms', component: HotelListComponent },
      { path: 'details', component: HotelCardComponent },      
      { path: '', redirectTo: 'rooms', pathMatch: 'full' }, // Default child route
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
