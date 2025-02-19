import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrl: './corporate.component.scss'
})
export class CorporateComponent {
  registrationForm: FormGroup;
  msg:any
  errorMsg: any
  countries = [
    { code: '+91', name: 'India' },
    { code: '+1', name: 'United States' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+61', name: 'Australia' },
    { code: '+81', name: 'Japan' },
    { code: '+33', name: 'France' },
    { code: '+49', name: 'Germany' },
    { code: '+55', name: 'Brazil' },
    { code: '+91', name: 'India' },
    { code: '+1', name: 'Canada' },
    { code: '+27', name: 'South Africa' },
    { code: '+34', name: 'Spain' },
    { code: '+39', name: 'Italy' },
    { code: '+86', name: 'China' },
    { code: '+7', name: 'Russia' },
    { code: '+52', name: 'Mexico' },
    { code: '+81', name: 'Japan' },
    { code: '+66', name: 'Thailand' },
    { code: '+55', name: 'Brazil' },
    { code: '+41', name: 'Switzerland' },
    { code: '+27', name: 'South Africa' },
    { code: '+90', name: 'Turkey' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+33', name: 'France' },
    { code: '+45', name: 'Denmark' },
    { code: '+46', name: 'Sweden' },
    { code: '+47', name: 'Norway' },
    { code: '+48', name: 'Poland' },
    { code: '+31', name: 'Netherlands' },
    { code: '+32', name: 'Belgium' },
    { code: '+358', name: 'Finland' },
    { code: '+351', name: 'Portugal' },
    { code: '+34', name: 'Spain' },
    { code: '+30', name: 'Greece' },
    { code: '+41', name: 'Switzerland' },
    { code: '+49', name: 'Germany' },
    { code: '+962', name: 'Jordan' },
    { code: '+974', name: 'Qatar' },
    { code: '+971', name: 'United Arab Emirates' },
    { code: '+966', name: 'Saudi Arabia' },
    { code: '+98', name: 'Iran' },
    { code: '+234', name: 'Nigeria' },
    { code: '+880', name: 'Bangladesh' },
    { code: '+20', name: 'Egypt' },
    { code: '+213', name: 'Algeria' },
    { code: '+91', name: 'India' }
  ];
  constructor(private fb: FormBuilder,private Apiservice: ApiService) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile:['', [Validators.required, Validators.pattern('^[0-9]{1,15}$'), Validators.maxLength(15)]], 
      city: ['', Validators.required],
      selectedCountryCode: ['+91'] 
    });
  }

  onSubmit() {
    this.msg ='';
    this.errorMsg = '';
    if (this.registrationForm.valid) {
       let data={
        name:this.registrationForm.value.name,
        company_name:this.registrationForm.value.company,
        email:this.registrationForm.value.email,
        phone_number: this.registrationForm.value.selectedCountryCode+ ' ' + this.registrationForm.value.mobile,
        city:this.registrationForm.value.city
      } 
      console.log('Form Submitted', data); 
      this.Apiservice.business(data).subscribe({
        next: (res) => {
          console.log('Registration successful', res);
          if (res.status_code === 200) {
          this.msg = res.message; // Success message
          this.registrationForm.reset();
          }
        },
        error: (err) => {
          //console.error('Registration failed', err);
          this.errorMsg = err.message; 
        }
      });
    } else {
      console.warn('Form is invalid. Please fill in all required fields correctly.');
      this.errorMsg = ' Please fill in all required fields correctly.'; 
    }
  }
  
}

