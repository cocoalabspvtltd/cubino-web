import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageServiceService } from '../../services/storage-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isScrolled = false; // Tracks the scroll state
  isMenuOpen = false; // Tracks the state of the mobile menu
  isUserDropdownOpen: boolean = false;
  loginToken: any
  lang:any
  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,@Inject(PLATFORM_ID) private platformId: Object,private datePipe: DatePipe, public translate:TranslateService,private storageService: StorageServiceService
  ) {
      this.translate.addLangs(['en','es','fr','la']);
      this.translate.setDefaultLang('en');
      this.translate.use('en')
  }
 
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; // Toggles the menu state
    console.log( this.isMenuOpen)
  }

  closeMenu(): void {
    this.isMenuOpen = false; // Closes the menu
  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 50; // Add "scrolled" class after scrolling 50px
  }
  ngOnInit(): void {   
    this.loginToken = this.storageService.getItem('token');
    this.lang= this.storageService.getItem('lang');
   // console.log(this.loginToken)
   console.log('Current Language:', this.translate.currentLang);
  }
  toggleUserDropdown(): void {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login')
    this.apiService.logout().subscribe( (res) => {
  //   console.log(res)
    })
      
  }
  ChangeLang(e:any){
  //console.log(selectedLanguage)
  const selectedLanguage = e.target.value;
  //alert(selectedLanguage );
  //console.log(selectedLanguage)
  localStorage.setItem('lang',selectedLanguage);
  this.translate.use(selectedLanguage)
  }
}
