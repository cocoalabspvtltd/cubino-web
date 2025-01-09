import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  signUpForm:any
  msg: any;
  errorMsg: any;
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
  

  
  
  constructor(private Apiservice: ApiService,private router: Router,private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the form with validation
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Name validation
      email: ['', [Validators.required, Validators.email]], // Email validation
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{1,15}$'), Validators.maxLength(15)]], // Mobile validation,
      selectedCountryCode: ['+91'] 
    });
  }

  // Submit the form
  onSubmit() {
    this.msg ='';
    this.errorMsg = '';
    if (this.signUpForm.valid) {
     // console.log(this.signUpForm.value);
           // Handle form submission (e.g., call an API)
      let data= {
        name: this.signUpForm.value.name,
        email:this.signUpForm.value.email,
        phone_number:  this.signUpForm.value.selectedCountryCode+ ' ' + this.signUpForm.value.mobile}
        
      console.log('data',data)

      this.Apiservice.register(data).subscribe({
        next: (res) => {
          console.log(res)
          if (res.status_code== 201) {
            this.msg = res.message; // Success message
            this.errorMsg = '';
            this.signUpForm.reset();
            this.router.navigate(['/login']);
          } else {
            this.msg ='';
            this.errorMsg = res.message; // Error message from API
          }
        },
        error: (err) => {
          console.error('HTTP Error:', err);
          this.errorMsg = err;
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}