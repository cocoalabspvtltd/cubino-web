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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
