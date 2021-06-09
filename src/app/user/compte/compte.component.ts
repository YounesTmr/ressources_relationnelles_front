import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
import { faWrench, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { KPI } from 'src/app/interfaces/KPI';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {
  /**
   *
   * Utilisateur connecte
   * variable Formulaire
   * Icon Wrench
   */
  user : Users;
  userVisitor: Users;
  userForm: FormGroup;
  friendForm: FormGroup;
  PresentationUser = false;
  addFormVisibility = false;


  statsFavorite : KPI;
  statsComple: KPI;
  statsRessource: KPI;
  statsFriend: KPI;


  faWrench = faWrench;
  faUserAlt = faUserAlt;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private statsUser: StatisticsService
  ) { }

    /**
   *
   * Reciuperation donnée utilisateur connecte
   */
  ngOnInit(): void {
    let userSearch = this.route.snapshot.paramMap.get('username');
    if(userSearch != null){
      this.userService.getOneUserbyUsername(userSearch).subscribe(
        reponse => {
          if(reponse == null){
            this.router.navigateByUrl('/');
          }else{
            if(sessionStorage.getItem('token').length > 1){
              this.checkUsersVisitor(sessionStorage.getItem('token'));
              this.addFormVisibility = true;
            }
            this.PresentationUser = true;
            this.initAddFriendForm(reponse.id);
            this.user = reponse;
          }
        });

    }else{
      if(sessionStorage.getItem('token')){
        this.PresentationUser = false;
        this.checkUsersProfil(sessionStorage.getItem('token'));
        this.initUserForm();
      }else{
        this.router.navigateByUrl('/');
      }
    }
  }
    /**
   *
   * Recuperation donnée utilisateur et user visitor
   */
  checkUsersVisitor(token){
      this.userService.CheckUserToken(token).subscribe(
        reponse => {
          this.userVisitor = reponse;
        });
      }

  checkUsersProfil(token){
    this.userService.CheckUserToken(token).subscribe(
          reponse => {
            this.getUser(reponse.id);
          });
        }

    /**
   *
   * Recuperation donnée utilisateur
   */
  getUser(id){
    this.userService.getOneUser(id).subscribe(
      reponse => {
          this.user = reponse;
          this.statistics(this.user.id);
          this.userForm.get('username').setValue(this.user.username);
          this.userForm.get('county').setValue(this.user.county);
          this.userForm.get('country').setValue(this.user.country);
          this.userForm.get('email').setValue(this.user.email);
          if(this.user.birthDate == null){
            this.user.birthDate = "00/00/0000";
          }
          let changeBirthDate = this.user.birthDate.split('/');
          let jourBirthDate;;
          if(changeBirthDate[0][0] == "0"){
            jourBirthDate = parseInt(changeBirthDate[0]) + 1;
            jourBirthDate = "0" + jourBirthDate;
          }else{
            jourBirthDate = parseInt(changeBirthDate[0]);
          }

          this.user.birthDate = jourBirthDate + "/" + changeBirthDate[1] + "/" + changeBirthDate[2];
          this.userForm.get('birthDate').setValue(jourBirthDate + "/" + changeBirthDate[1] + "/" + changeBirthDate[2]);

      });

  }

    /**
   *
   * Initialisation des formulaire
   */
  initUserForm(){
    this.userForm = this.formBuilder.group({
      username: [''],
      password: '',
      cpassword: '',
      county: ['',Validators.required],
      country: ['',Validators.required],
      email: [''],
      birthDate: ['',Validators.required],
    })
  }

  initAddFriendForm(id){
    this.friendForm = this.formBuilder.group({
      memberId:id,
      group: ['',Validators.required]
    })
  }

    /**
   *
   * Update de l'utilisateur
   */
  updateUser(){

    $('#changeUser').modal('hide');
    let password = this.userForm.get('password').value;
    let cpassword = this.userForm.get('cpassword').value;

    if(password == cpassword && password != ""){
      this.user.password = password;
      this.user.cpassword = cpassword;
      this.userService.updatePassword(this.user,this.user.id);
      this.userForm.get('password').setValue('');
      this.userForm.get('cpassword').setValue('');
    }


      this.user.username= this.userForm.get('username').value;
      this.user.birthDate = this.userForm.get('birthDate').value;
      this.user.email = this.userForm.get('email').value;
      this.user.country = this.userForm.get('country').value;
      this.user.county = this.userForm.get('county').value;

      this.userService.updateOneUser(this.user,this.user.id)

  }

    /**
   *
   * add friend de l'utilisateur
   */
  addFriendUser(){
    this.userService.addFriend(this.friendForm.value,this.userVisitor.id);
    $('#addFriend').modal('hide');
  }

    /**
   *
   * Récuperzation des stats user
   */
  statistics(id){
    this.statsUser.getCountCreatedResourcesByUser(id).subscribe(
      reponse => {
          this.statsRessource = reponse;
      });
    this.statsUser.getCountCompletesByUser(id).subscribe(
      reponse => {
        this.statsComple = reponse;
        });
    this.statsUser.getCountFavoritesByUser(id).subscribe(
      reponse => {
        this.statsFavorite = reponse;
      });
    this.statsUser.getCountFriendsByUser(id).subscribe(
      reponse => {
        this.statsFriend = reponse;
      });
  }
}
