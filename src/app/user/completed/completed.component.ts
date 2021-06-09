import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/interfaces/users';
import { RessourceService } from 'src/app/services/ressource.service';
import { UsersService } from 'src/app/services/users.service';
import { faVideo, faFileAlt, faPoop, faVolumeUp, faImage,faTrash } from '@fortawesome/free-solid-svg-icons';
import { Complete } from 'src/app/interfaces/complete';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {
  /**
   * Création des variables globales
   * Icons
   */
  user: Users;
  completes: Complete[];
  ressoruces = [];
  updateRessource = {"complete":false}

  faVideo = faVideo;
  faFileAlt = faFileAlt
  faPoop = faPoop;
  faVolumeUp = faVolumeUp;
  faImage = faImage;
  faTrash = faTrash;
  fileLocalUrl = environment.fileLocalUrl;
  constructor(
    private usersService: UsersService,
    private resourceService: RessourceService,
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
    this.usersService.CheckUserToken(token).subscribe(
      reponse => {
        this.getUser(reponse.id);
      });
    }

  getUser(id){
    this.usersService.getOneUser(id).subscribe(
      reponse => {
          this.user = reponse;
          this.getAllResourceComplete(this.user.id);
      });
  }

  getAllResourceComplete(id){
    this.resourceService.getAllRessourceComplete(id).subscribe(
      reponse => {
          this.completes = reponse;
          for (let index = 0; index < this.completes.length; index++) {
              this.getOneRessource(this.completes[index].resource.id);
      }});
  }

  getOneRessource(id){
    this.resourceService.getOneRessource(id).subscribe(
      reponse => {
          this.ressoruces.push(reponse);
      });
  }

  DeleteRessource(idUser, idRessource, idInRessource){
    this.ressoruces.splice(0,this.ressoruces.length);
    this.resourceService.UpdateRessourceFavoriteOrCOmplete(idUser,idRessource,this.updateRessource);
    this.ngOnInit();
  }


}
