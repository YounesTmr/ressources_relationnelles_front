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
    this.userService.CheckUser(this.connexionForm.value).subscribe({
      next: data => {
        sessionStorage.setItem('token',data['token']);
        window.location.reload();
      },
      error: error => {
        document.getElementById('errorMdpId').innerHTML="Identifiant ou mot de passe incorrecte";
      }
  });
  }

    /**
   * 
   * Ajout d'un utilisateur
   */
  addUser(){
    var name = document.forms[1]["pseudo"];         
    if (name.value == ""){ 
        document.getElementById('errorname').innerHTML="Veuillez entrez un nom valide";  
        name.focus(); 
        return false; 
    }
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

  validatePseudo(){ 
    var name = document.forms[1]["pseudo"];         
    if (name.value.length < 5){ 
        document.getElementById('errorPseudo').innerHTML="votre pseudo doit faire minimum 5 caractères";  
        name.focus(); 
        return false; 
    }else{
        document.getElementById('errorPseudo').innerHTML="";  
    }
  }

  validateMail(){ 
    var name = document.forms[1]["mail"]; 
    var tst = new RegExp(name.pattern);   
    if (!tst.test(name.value)){ 
        document.getElementById('errorMail').innerHTML="veuillez entrez un email valide";  
        name.focus(); 
        return false; 
    }else{
        document.getElementById('errorMail').innerHTML="";  
    }
  }

  validatePassword(){ 
    var name = document.forms[1]["password"];
    var tst = new RegExp(name.pattern);
    if (!tst.test(name.value) ){ 
        document.getElementById('errorPassword').innerHTML="Doit contenir 1 majuscule, 1 minuscule, 1 chiffre et un total de 8 charactere minimum";  
        name.focus(); 
        return false; 
    }else{
        document.getElementById('errorPassword').innerHTML="";  
    }
  }

  validateConfirmation(){ 
    var name = document.forms[1]["confirmation"];   
    if (name.value !== document.forms[1]["password"].value){ 
        document.getElementById('errorConfirmation').innerHTML="veuillez entrer les mêmes mot de passe";  
        name.focus(); 
        return false; 
    }else{
        document.getElementById('errorConfirmation').innerHTML="";  
    }
  }
}