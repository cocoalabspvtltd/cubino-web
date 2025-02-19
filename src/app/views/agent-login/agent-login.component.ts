import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-login',
  templateUrl: './agent-login.component.html',
  styleUrl: './agent-login.component.scss'
})
export class AgentLoginComponent {
 loginForm: FormGroup;
  isOtpSent: boolean = false;
  msg: any;
  errorMsg:any
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
  msg1: any;
  errorMsg1: any;
  data: any;
  token: any;

  constructor(private Apiservice: ApiService,private router: Router,private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', Validators.required],
      // selectedCountryCode: ['+91'] 
    });
  }

  get mobile() {
    return this.loginForm.get('mobile')!;
  }

  get otp() {
    return this.loginForm.get('otp')!;
  }


  onSubmit(): void {    
    localStorage.clear();
    this.msg ='';
    this.errorMsg = '';
    if (this.loginForm.valid) {
      // alert('Login successful!');
      let data={
        //phone_number:this.loginForm.value.mobile,
        email:this.loginForm.value.email,
        password:this.loginForm.value.otp
      }
      console.log('data',data)
      this.Apiservice.agentlogin(data).subscribe({
        next: (res) => {
          console.log(res)
           if (res.status_code== 200) {
            this.token =res?.token;      
            const arrayJson = JSON.stringify(res);
            localStorage.setItem('agent', arrayJson);
            localStorage.setItem('token', this.token || '');
            localStorage.setItem('logged', 'true');            
            this.errorMsg1 = '';
            this.loginForm.reset();
             this.router.navigate(['/hotels']);
          } else {
            this.msg1 ='';
            this.errorMsg1 = res.message; // Error message from API
          }
        },
        error: (err:any) => {
          console.error('HTTP Error:', err.error.message);
          this.errorMsg1 = err.error.message;
        },
      });
    } else {
      alert('Please check your inputs');
    }
  }
}
