import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrl: './header1.component.scss'
})
export class Header1Component {
 isScrolled = false; // Tracks the scroll state
  isMenuOpen = false; // Tracks the state of the mobile menu

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
}

