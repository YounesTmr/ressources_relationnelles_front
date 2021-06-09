import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Users } from '../interfaces/users';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
/**
 * Création varible Formulaire de recherche
 */
  searchForm: FormGroup;

  user: Users;
  userPower = false;

  /**
   * 
   * Récuperation de la class router et formBuilder
   */
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UsersService
  ) { }


  ngOnInit(): void {
    this.initFormSearch();
    if(sessionStorage.getItem('token')){
      this.checkUsers(sessionStorage.getItem('token'));
    }
  }

  /**
   * Initialisation du formulaire
   */
  initFormSearch(){
    this.searchForm = this.formBuilder.group({
      username: ['',Validators.required]
    })
  }

    /**
   * Evenement lors de la recherche du formulaire
   */
  searchUser(){
    this.router.navigateByUrl('/Profil/' + this.searchForm.get('username').value);
  }

  checkUsers(token){
    this.userService.CheckUserToken(token).subscribe(
      reponse => {
          this.user = reponse;
          if(reponse.status == 'MODERATOR' || reponse.status == 'ADMINISTRATOR' || reponse.status == 'SUPER_ADMINISTRATOR'){
            this.userPower = true;
          }
      });
    }

    deconnexion(){
      sessionStorage.setItem('token','');
      window.location.reload();
      this.router.navigateByUrl('/');
    }
}
