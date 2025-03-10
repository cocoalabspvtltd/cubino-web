import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrl: './list-property.component.scss'
})
export class ListPropertyComponent {
  myForm:any
  submitted = false;
  errorMsg: any;
  msg: any;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}
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
  ngOnInit(): void {
    // Initialize the form with name, phone, and email fields with validations
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      selectedCountryCode: ['+91'] 
    });
  }

  // Getter for easy access to form controls in the template
  get f() {
    return this.myForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Stop if the form is invalid
    if (this.myForm.invalid) {
      return;
    }

   
    // Call your API service (for example, registration)
    let data={ phone_number:  this.myForm.value.selectedCountryCode+ ' ' + this.myForm.value.phone_number,
      email:this.myForm.value.email,name:this.myForm.value.name
    }   
    console.log('Form Data:', data);
    this.apiService.listproperty(data).subscribe({
      next: (res) => {
        console.log('Registration success:', res);
        if (res.status_code == 200) {         
          this.msg = res.message; // Success message
          this.myForm.reset();
        }else{
          this.errorMsg = res.message; // Error message from API
        }
      },
      error: (err) => {
        console.error('Registration error:', err);
        // Optionally, display an error message to the user
      }
    });
  }
}