import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /**
   * 
   * Formulaire Création d'un utilisateur
   * Formulaire COnnexion d'un utilisateur
   */
   creationForm: FormGroup;
   connexionForm: FormGroup;

   notGoodPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('token') != null){
      if(sessionStorage.getItem('token').length > 1){
        this.router.navigateByUrl('/Profil');
      }
    }
    this.initConnexionForm();
    this.initCreationForm();

  }

  /**
   * 
   * Iniatilisation Formulaire Création
   */
  initCreationForm(){
    this.creationForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      username: ['',Validators.required],
      password: ['',Validators.required],
      cpassword: ['',Validators.required],
      status: 'MEMBER'
    })
  }

  /**
   * 
   * Iniatilisation Formulaire Connexion
   */
  initConnexionForm(){
    this.connexionForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

    /**
   * 
   * Connexion d'un utilisateur
   */
  checkUser(){
    this.userService.CheckUser(this.connexionForm.value);
  }

    /**
   * 
   * Ajout d'un utilisateur
   */
  addUser(){
    if(this.creationForm.get('password').value != this.creationForm.get('cpassword').value){
      this.notGoodPassword = true;
    }else{
      this.userService.addOneUser(this.creationForm.value).subscribe({
        next: data => {
          console.log("add succeful");
          this.userService.CheckUser(this.creationForm.value);
        },
        error: error => {
            console.error('There was an error!', error);
        }
    });
    }
  }

}