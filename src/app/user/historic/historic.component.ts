import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Historic } from 'src/app/interfaces/historic';
import { Ressource } from 'src/app/interfaces/ressource';
import { Users } from 'src/app/interfaces/users';
import { HistoricService } from 'src/app/services/historic.service';
import { RessourceService } from 'src/app/services/ressource.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {

  user: Users;
  historics: Historic[];
  ressource: Ressource;
  nameOfRessource = [];

  constructor(
    private userService: UsersService,
    private historicService: HistoricService,
    private ressourceService: RessourceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('token')){
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
      });
    }

  getUser(id){
    this.userService.getOneUser(id).subscribe(
      reponse => {
          this.user = reponse;
          this.getAllHistoric(this.user.id)
      });
  }


  getAllHistoric(id){
    this.historicService.getAllhistoricByUser(id).subscribe(
      reponse => {
          this.historics = reponse;
          for (let index = 0; index < this.historics.length; index++) {
            this.getOneRessource(this.historics[index].resource.id);
          }
      });
  }

  getOneRessource(id){
    this.ressourceService.getOneRessource(id).subscribe(
      reponse => {
          this.ressource = reponse;
          this.nameOfRessource.push(this.ressource.name);
      });
  }

 // réécriture de l'action
  action(action){
    switch(action){
      case 'CONSULT':{
        return 'consultée';
      }
      case 'SHARE':{
        return 'partagée';
      }
      case 'CREATE_RESOURCE':{
        return 'créée';
      }
      case 'EDIT_RESOURCE':{
        return 'modifiée';
      }
      case 'COMMENT':{
        return 'commentée';
      }
      case 'ADD_FAVORITE':{
        return 'ajoutée en favori';
      }
      case 'COMPLETE':{
        return 'complétée';
      }
      case 'ADD_FRIEND':{
        return 'ajouté en amis';
      }
    }
  }
}
