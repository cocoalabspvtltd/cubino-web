import { Component } from '@angular/core';

@Component({
  selector: 'app-travel-agent',
  templateUrl: './travel-agent.component.html',
  styleUrl: './travel-agent.component.scss'
})
export class TravelAgentComponent {
  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
