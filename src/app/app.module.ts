import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './views/home/home.component';
import { MemberComponent } from './views/member/member.component';
import { ListPropertyComponent } from './views/list-property/list-property.component';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.component';
import { HotelListComponent } from './views/user-dashboard/hotel-list/hotel-list.component';
import { HotelCardComponent } from './views/user-dashboard/hotel-card/hotel-card.component';
import { AboutComponent } from './views/about/about.component';
import { ContactComponent } from './views/contact/contact.component';
import { CorporateComponent } from './views/corporate/corporate.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { PrivacyPolicyComponent } from './views/privacy-policy/privacy-policy.component';
import { TermsComponent } from './views/terms/terms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HotelsListDetailsComponent } from './views/hotels-list-details/hotels-list-details.component';
import { Header1Component } from './layout/header1/header1.component';
import { HotelsListsComponent } from './views/hotels-lists/hotels-lists.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MemberComponent,
    ListPropertyComponent,
    UserDashboardComponent,
    HotelListComponent,
    HotelCardComponent,
    AboutComponent,
    ContactComponent,
    CorporateComponent,
    LoginComponent,
    RegisterComponent,
    PrivacyPolicyComponent,
    TermsComponent,   
    HotelsListDetailsComponent,
    Header1Component,
    HotelsListsComponent,
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,MatDatepickerModule,MatFormFieldModule,MatNativeDateModule,BrowserAnimationsModule,MatSelectModule,
    AppRoutingModule,MatButtonModule,MatInputModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
