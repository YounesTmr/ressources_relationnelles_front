import { Component, OnInit } from '@angular/core';
import { Complete } from 'src/app/interfaces/complete';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
import { faVideo, faFileAlt, faVolumeUp, faImage,faTrash } from '@fortawesome/free-solid-svg-icons';
import { RessourceService } from 'src/app/services/ressource.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.scss']
})
export class FavorisComponent implements OnInit {

  user: Users;
  completes: Complete[];
  ressoruces = [];
  updateRessource = {"favorite":false}

  faVideo = faVideo;
  faFileAlt = faFileAlt
  faVolumeUp = faVolumeUp;
  faImage = faImage;
  faTrash = faTrash;

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
    this.resourceService.getAllRessourceFavorites(id).subscribe(
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
