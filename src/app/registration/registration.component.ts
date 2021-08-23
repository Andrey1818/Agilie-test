import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyValidators} from "./validator/my.validators";
import {User} from "../shared/my.interfaces";
import {RegisterService} from "../shared/register.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {visibilityErrorOrSuccess} from "../shared/my.animations";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [visibilityErrorOrSuccess]
})
export class RegistrationComponent implements OnInit, OnDestroy {

  form: FormGroup
  formCheckbox = false
  submitted = false
  $stream: Subscription
  errorEmail: string
  successMessage: boolean
  noSession: boolean

  constructor(
    private registerService: RegisterService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        MyValidators.noTrimPass,
        MyValidators.noRepeatSymbol,
        MyValidators.finderLettersAndNumbers,
        MyValidators.checkedBadSymbol,
        Validators.minLength(6)
      ]),
      confirmPass: new FormControl('', [Validators.required])
    })
    if (this.registerService.noSession) {
      this.noSession = this.registerService.noSession
    }
  }

  submit() {
    this.registerService.noSession = false
    this.noSession = false

    if (
      this.form.invalid
      || !this.formCheckbox
      || this.form.value.password !== this.form.value.confirmPass
      || this.submitted
    ) {
      return
    }

    const userObj: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.submitted = true

    this.$stream = this.registerService.registration(userObj).subscribe(() => {
      this.successMessage = true
    }, () => {
      this.submitted = false;
      this.errorEmail = this.registerService.errorEmail
    }, () => {
      setTimeout(() => {
        this.submitted = false
        this.successMessage = false
        this.router.navigate(['/dashboard'])
      }, 2000)
    })
  }

  checkbox() {
    this.formCheckbox = !this.formCheckbox
  }

  ngOnDestroy() {
    this.$stream.unsubscribe()
  }
}
