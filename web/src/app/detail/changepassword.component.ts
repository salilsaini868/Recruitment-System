import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { HeaderComponent } from './../shared/header/header.component';
import { DetailModule } from './shared/detail.module';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl} from '@angular/forms';

@Component({
    selector: 'app-changepassword',
    templateUrl: 'changepassword.component.html'
})
export class ChangepasswordComponent implements OnInit {
    changePasswordForm: FormGroup;

    constructor(private router: Router, fb: FormBuilder) {
        this.changePasswordForm = fb.group({
            'old_password': [null, Validators.required],
            'new_password': [null, Validators.required],
            'confirm_new_password': [null, [Validators.required, this.passwordMatch]]
        });
    }

    passwordMatch(control: AbstractControl) {
        let paswd = control.root.get('new_password');
        if (paswd && control.value != paswd.value) {
            return {
                passwordMatch: false
            };
        }
        return null;
    }
    changePassword(value) {
        if (this.changePasswordForm.valid) {
            console.log("Change password form valid");
        }
    }

    ngOnInit() {
    }

    goBack() {
        this.router.navigate(['Dashboard']);
    }
    
}
