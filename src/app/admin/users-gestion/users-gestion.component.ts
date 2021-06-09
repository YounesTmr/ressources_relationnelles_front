import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
import { faTrashAlt, faWrench, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-gestion',
  templateUrl: './users-gestion.component.html',
  styleUrls: ['./users-gestion.component.scss']
})
export class UsersGestionComponent implements OnInit {
  /**
   * Listes de type utilisateurs
   * Formlaire Utilisateur
   * 2 Variable tampon lors d'un update d'utilisateurs
   */
  UserConnecte : Users;
  users: Users[];
  userForm: FormGroup;
  userIdUpdateNow;
  userIdUpdateApi;


  changeModerator = false;
  changeAdmin = false;
  changeSuperAdmin = false;

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('token')){
      this.checkUsers(sessionStorage.getItem('token'));
    }else{
      this.router.navigateByUrl('/');
    }


    this.getUsers();
    this.initUserForm();
  }
      /**
   *
   * Recuperation donnée utilisateur
   */
  checkUsers(token){
    this.userService.CheckUserToken(token).subscribe(
      reponse => {
        this.UserConnecte = reponse;
      });
    }


  /**
   * 
   * Variable icon fontawersome
   */

  faTrash = faTrashAlt;
  faWrench = faWrench;
  faSync = faRedoAlt;

  /**
   * 
   * Recuperatio ndes utilisarteurs
   */
  getUsers(){
    this.userService.getAllUsers().subscribe(
      reponse => {
          this.users = reponse;
      });
  }

  /**
   * 
   * Suppresssion d'un utilisateur
   */
  deleteUser(idUser, id){
    this.userService.deleteOneUser(idUser);
    this.ngOnInit();
  }

  /**
   * 
   * Validation d'un compte
   */
  validationCompte(id, bool, idUser){
    this.userService.changeVisibility(id);
    this.users[idUser].activatedAccount = bool;
  }

  /**
   * 
   * Modification d'un status avec modal
   */
  updateStatus(userId,id,status){
    this.userForm.get('status').setValue(status);
    this.userIdUpdateNow = id;
    this.userIdUpdateApi = userId;
    this.validForChange(status);
  }

    /**
   * 
   * Iniatilisation Formulaire Création avec API
   */
  updateStatusChoose(){
    this.userService.changeStatus(this.userIdUpdateApi,this.userForm.value);
    this.users[this.userIdUpdateNow].status = this.userForm.get('status').value;
    $('#changeStatus').modal('hide');
    this.resetDroitToChange();
  }

    /**
   * 
   * Iniatilisation Formulaire
   */
  initUserForm(){
    this.userForm = this.formBuilder.group({
      status: ['',Validators.required]
    })
  }

    /**
   * 
   *  changement de status par ordre de droit
   */

  validForChange(status){
    if(this.UserConnecte.status == "SUPER_ADMINISTRATOR"){
      this.changeAdmin = true;
      this.changeModerator = true;
      this.changeSuperAdmin = true;
    }else if(this.UserConnecte.status == "MODERATOR"){
      this.changeModerator = true;
    }else if(this.UserConnecte.status == "ADMINISTRATOR"){
      this.changeAdmin = true;
      this.changeModerator = true;
    }
  }

      /**
   * 
   *  banOrNot
   */

  banOrNot(status){
  
    if(this.UserConnecte.status == "SUPER_ADMINISTRATOR"){
      return true;
    }else if(status == "SUPER_ADMINISTRATOR"){
      return false;
    }else if(status == "ADMINISTRATOR" && this.UserConnecte.status != "ADMINISTRATOR"){
      return false;
    }

    return true;
  }

      /**
   * 
   *  Trie des utilisaterus pour supprimer un compte
   */
  selectDelete(status){
    if(status == "SUPER_ADMINISTRATOR"){
      return false;
    }else if(status == "ADMINISTRATOR" && this.UserConnecte.status == "ADMINISTRATOR"){
      return false;
    }else if(status == "MODERATOR" && this.UserConnecte.status == "MODERATOR"){
      return false;
    }
    return true;
  }



  resetDroitToChange(){
    this.changeAdmin = false;
    this.changeModerator = false;
    this.changeSuperAdmin = false;
  }
}
