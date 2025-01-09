import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  isScrolled = false; // Tracks the scroll state
  isMenuOpen = false; // Tracks the state of the mobile menu

  isUserDropdownOpen: boolean = false;

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
toggleUserDropdown(): void {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
}

}

