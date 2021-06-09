import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Shared } from 'src/app/interfaces/shared';
import { Users } from 'src/app/interfaces/users';
import { RessourceService } from 'src/app/services/ressource.service';
import { UsersService } from 'src/app/services/users.service';
import { faVideo, faFileAlt, faPoop, faVolumeUp, faImage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  user: Users;
  userFriend: Users;
  shareds: Shared[];
  IdMemberFriend;
  ressoruces = [];
  
  faVideo = faVideo;
  faFileAlt = faFileAlt
  faPoop = faPoop;
  faVolumeUp = faVolumeUp;
  faImage = faImage;

  constructor(
    private ressourceService: RessourceService,
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.IdMemberFriend = this.route.snapshot.paramMap.get('id');

    if(this.IdMemberFriend){
      if(sessionStorage.getItem('token')){
        this.checkUsers(sessionStorage.getItem('token'));
      }else{
        this.router.navigateByUrl('/');
      }
      this.getFriendUser(this.IdMemberFriend);
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
          this.getAllRessourceFriend(this.user.id);
      });
  }

  getFriendUser(id){
    this.userService.getOneUser(id).subscribe(
      reponse => {
          this.userFriend = reponse;
      });
  }

  getAllRessourceFriend(id){
    this.ressourceService.geFriendRessource(id).subscribe(
      reponse => {
          this.shareds = reponse;
          for (let index = 0; index < this.shareds .length; index++) {
            if(this.shareds [index].sender.id == this.IdMemberFriend){
              this.getOneRessource(this.shareds[index].resource.id);
            };
            
          }
      });
  }


  getOneRessource(id){
    this.ressourceService.getOneRessource(id).subscribe(
      reponse => {
          this.ressoruces.push(reponse);
      });
  }
}
