import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.component';
import { HotelListComponent } from './views/user-dashboard/hotel-list/hotel-list.component';
import { AboutComponent } from './views/about/about.component';
import { ContactComponent } from './views/contact/contact.component';
import { HotelCardComponent } from './views/user-dashboard/hotel-card/hotel-card.component';
import { MemberComponent } from './views/member/member.component';
import { CorporateComponent } from './views/corporate/corporate.component';
import { ListPropertyComponent } from './views/list-property/list-property.component';
import { LoginComponent } from './views/login/login.component';
import { PrivacyPolicyComponent } from './views/privacy-policy/privacy-policy.component';
import { TermsComponent } from './views/terms/terms.component';
import { RegisterComponent } from './views/register/register.component';
import { HotelsListDetailsComponent } from './views/hotels-list-details/hotels-list-details.component';
import { HotelsListsComponent } from './views/hotels-lists/hotels-lists.component';
import { BookingComponent } from './views/booking/booking.component';
import { CancellationsComponent } from './views/cancellations/cancellations.component';
import { ProfileComponent } from './views/profile/profile.component';
import { MyBookingComponent } from './views/my-booking/my-booking.component';
import { CitiesComponent } from './views/cities/cities.component';
import { TravelAgentComponent } from './views/travel-agent/travel-agent.component';
import { AgentLoginComponent } from './views/agent-login/agent-login.component';
import { AgentHomeComponent } from './views/agent-home/agent-home.component';

  const routes: Routes = [
    { path: '',                        component: HomeComponent },
    { path: 'index',                   component: HomeComponent },
    { path: 'about',                   component: AboutComponent },
    { path: 'member',                  component: MemberComponent },
    { path: 'contact',                 component: ContactComponent },
    { path: 'corporate',               component: CorporateComponent },
    { path: 'property',                component: ListPropertyComponent },
    { path: 'login',                   component: LoginComponent },
    { path: 'hotels',                  component: HotelsListsComponent },
    { path: 'room-details',            component: HotelsListDetailsComponent  },
    { path: 'register',                component: RegisterComponent },
    { path: 'privacy-policy',          component: PrivacyPolicyComponent },
    { path: 'booking',                 component: BookingComponent},
    { path: 'terms-conditions',        component: TermsComponent },
    { path: 'cancellations',           component: CancellationsComponent },
    { path: 'profile',                 component: ProfileComponent},
    { path: 'bookings',                component: MyBookingComponent},
    { path: 'All-cities',              component: CitiesComponent},
    { path: 'TravelAgent',             component: TravelAgentComponent },
    { path: 'agent',                   component: AgentLoginComponent },
    { path: 'agent-home',              component: AgentHomeComponent },
    { path: 'home', component: UserDashboardComponent, children: [
        { path: 'rooms', component: HotelListComponent },
        { path: 'details', component: HotelCardComponent },
        { path: '', redirectTo: 'rooms', pathMatch: 'full' },
      ],
    },
    // Fallback route for undefined paths
    { path: '**', redirectTo: '', pathMatch: 'full' }
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
