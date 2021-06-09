import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Friend } from 'src/app/interfaces/friend';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
 /**
  * Listes des variables
  * Utilisateurs Connecte
  * Variable tampon getAllUsersFriends(id)
  * Tableau des utilisaterus amis
  * Formulaire par type amis
  */
  userConnected: Users;
  UserFriend: Users;
  dataUserFriend = [];
  dataFriends: Friend[];
  friendForm: FormGroup;


  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  /**
   * Initialisation Formulaire
   * Recuperation donnée de l'User Connecte
   * Recuperation des amis
   */
  ngOnInit(): void {
    this.initFriendForm();
    if(sessionStorage.getItem('token') != null){
      this.checkUsers(sessionStorage.getItem('token'));

    }else{
      this.router.navigateByUrl('/');
    }
  }
    /**
   *
   * Recuperation donnée utilisateur
   */
  checkUsers(token){
    this.userService.CheckUserToken(token).subscribe(
      reponse => {
        this.getUser(reponse.id);
        this.getAllfriends(reponse.id,this.friendForm.get('type').value);
      });
    }
  /**
   * Initialisation Formulaire
   */
  initFriendForm(){
    this.friendForm = this.formBuilder.group({
      type: ['SOI',Validators.required]
    })
  }

  /**
   *
   * Recuperation sUser connecte
   */
  getUser(id){
    this.userService.getOneUser(id).subscribe(
      reponse => {
          this.userConnected = reponse;
      });
  }

    /**
   *
   * Recuperation listes amis par type
   */
  getAllfriends(id, type){
    this.userService.getAllFriends(id, type).subscribe(
      reponse => {
          this.dataFriends = reponse;
          for (let index = 0; index < this.dataFriends.length; index++) {
            this.getAllUsersFriends(this.dataFriends[index].member2['id']);
          }
      });
  }

    /**
   *
   * Recuperation des utilisaterus amis
   */
  getAllUsersFriends(id){
    this.userService.getOneUser(id).subscribe(
      reponse => {
          this.UserFriend = reponse;
          this.dataUserFriend.push(this.UserFriend);
      });
  }

    /**
   *
   * Update par type d'amitier
   */
  updateFriendTypeChoose(){
    this.dataUserFriend.splice(0,this.dataUserFriend.length);
    this.getAllfriends(this.userConnected.id,this.friendForm.get('type').value);
  }

}
