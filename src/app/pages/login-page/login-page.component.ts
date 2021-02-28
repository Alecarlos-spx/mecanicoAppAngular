import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { SecurityService } from 'src/app/util/security.service';
import { CustomValidator } from 'src/app/validators/custon.validator';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;

  hide = true;
  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private router: Router
  ) { 
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(7),
        Validators.maxLength(60),
        Validators.required,
        CustomValidator.EmailValidator
        // Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"),
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ngOnInit() {

    // const token = SecurityService.getToken();
    // if (token){
    //   this.service.refreshToken()
    //   .subscribe((data: any) => {
    //     this.setUser(data.customer, data.token);
    //   },
    //   (err) => {
    //     SecurityService.clear();
    //   }
    //   );
    // }
  }

  submit(){
    this.service.login(this.form.value).subscribe((data:any)=> {
      this.setUser(data.userName, data.token);
    },
    (err) => {
      console.log(err);
    });
  }

  setUser(user, token){
    SecurityService.set(user, token);
    this.router.navigate(['']);
  }
}
