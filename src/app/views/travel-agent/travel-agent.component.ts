import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-travel-agent',
  templateUrl: './travel-agent.component.html',
  styleUrl: './travel-agent.component.scss'
})
export class TravelAgentComponent {
  registrationForm: FormGroup;
  errorMsg: any;
  msg: any;
  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  constructor(private fb: FormBuilder, private http: HttpClient,private Apiservice: ApiService) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      pan_no: ['', Validators.required],
      agency_name: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(10)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    console.log('data',this.registrationForm.value)
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      this.Apiservice.travelAgent(formData ).subscribe({
        next: (res) => {
          console.log('Registration successful', res);
          this.msg = res.message;
        },
        error: (err) => {
          console.error('Registration failed', err);
          this.errorMsg = err.error.message;
        }
      });
    } else {
      console.warn('Form is invalid. Please fill in all required fields correctly.');
      this.registrationForm.markAllAsTouched();
    }
  }
}

