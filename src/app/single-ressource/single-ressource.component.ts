import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../interfaces/comment';
import { Ressource } from '../interfaces/ressource';
import { CommentsService } from '../services/comments.service';
import { RessourceService } from '../services/ressource.service';
import { faHeart, faHourglassEnd, faPencilRuler } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../services/users.service';
import { Users } from '../interfaces/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoricService } from '../services/historic.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-ressource',
  templateUrl: './single-ressource.component.html',
  styleUrls: ['./single-ressource.component.scss']
})
export class SingleRessourceComponent implements OnInit {
  
  /**
   * 
   * Variable de type ressource
   * icon
   */

  fileLocalUrl = environment.fileLocalUrl;


  user: Users;
  userPower = false;
  ressourceForFriendForm: FormGroup;

  formComment : FormGroup;

  ressource: Ressource;
  comments: Comment[];

  faPencilRuler = faPencilRuler;
  faHeart = faHeart;
  faHourglassEnd = faHourglassEnd;
  faTrash = faTrashAlt;

  constructor(
    private ressourceService: RessourceService,
    private commentService: CommentsService,
    private route: ActivatedRoute,
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private historicService: HistoricService
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('token')){
      this.checkUsers(sessionStorage.getItem('token'));
    }
    this.intiRessourceForFriendForm();
    this.getOneRessource(this.route.snapshot.paramMap.get('id'));
    
  }

   /**
   * 
   * Iniatilisation Formulaire Connexion
   */
  initFormComment(){
    this.formComment = this.formBuilder.group({
      body: ['',Validators.required],
      id: this.ressource.id
    })
  }

    /**
   *
   * Recuperation donnée utilisateur
   */
  checkUsers(token){
    this.userService.CheckUserToken(token).subscribe(
      reponse => {
        this.user = reponse;
        if(reponse.status == 'MODERATOR' || reponse.status == 'ADMINISTRATOR' || reponse.status == 'SUPER_ADMINISTRATOR'){
          this.userPower = true;
        }
        let data = {
          "mainMemberId":reponse.id,
          "resourceId":this.route.snapshot.paramMap.get('id'),
          "action":"CONSULT"
        }
        this.historicService.AddHistoric(data);
      });
    }

  /**
   * 
   *  récuperation d'une ressource
   */
  getOneRessource(id){
    this.ressourceService.getOneRessource(id).subscribe(
      reponse => {
          this.ressource = reponse;
          this.getAllCommentByRessource(id);
          this.initFormComment();
      });
  }

  /**
   *
   * Récuperatio ndes commetnaires de la ressource
   */
  getAllCommentByRessource(id){
    this.commentService.getCommentByRessource(id).subscribe(
      reponse => {
          this.comments = reponse;

      });
  }

    /**
   *a
   * Remettre la resource en brouillon
   */
  goToFavoryOrComplete(choose){

    let data;

    if(choose == 'favorite'){
      data = {
        "resourceId": this.ressource.id,
        "favorite":true
      }
    }else{
      data = {
        "resourceId": this.ressource.id,
        "complete":true
      }
    }

    this.userService.AfavoriteOrComplete(data,this.user.id);
    }
         /**
   *
   * Remettre la resource en brouillon
   */
  ressourceGoDraw(){
    let data = {
      "name": this.ressource.name, 
      "description": this.ressource.description, 
      "contentText": this.ressource.contentText, 
      "imageUrl": this.ressource.imageUrl, 
      "language": this.ressource.language['name'], 
      "resourceType": this.ressource.resourceType['name'], 
      "resourceCategory": this.ressource.resourceCategory['name'], 
      "relationshipType": this.ressource.relationshipType['name'], 
      "fileType": this.ressource.fileType['name']
    };

    
    this.ressourceService.resourceNotGood(data,this.ressource.id);
  }

           /**
   *
   * init form modal friend for resource
   */
  intiRessourceForFriendForm(){
    this.ressourceForFriendForm = this.formBuilder.group({
      group: '',
      username: '',
    })
  }
         /**
   *
   * Gestion evenement modal
   */
  addRessourceToFriend(){
    if(this.ressourceForFriendForm.get('username').value != ""){
      this.userService.getOneUserbyUsername(this.ressourceForFriendForm.get('username').value).subscribe(
        reponse => {
          if(reponse == null){

          }else{
            let data = {
              "recipientId":reponse.id,
              "resourceId": this.ressource.id
            }
            this.userService.addShare(data,this.user.id);
          }
          }
        );
    }else{
      let data = {
        "group":this.ressourceForFriendForm.get('group').value,
        "resourceId": this.ressource.id
      }
      this.userService.addShare(data,this.user.id);
    }


  }


  addComment(){
    let NewComment : Comment = {
      dateOfComment : "Maintenant",
      commentBodyText : this.formComment.get("body").value,
      id : 0,
      member : {
        username : this.user.username,
        email: "",
        password: "",
        cpassword: null,
        birthDate: "",
        county: "",
        country: "",
        dateInscription: "",
        activatedAccount: true,
        status: "",
        friendships: [],
        interactions: []
      }
    }

    this.comments.push(NewComment);
    this.commentService.addComment(this.formComment.value);
  }


         /**
   *
   * Delete coments
   */

   deleteComent(id){
    this.commentService.deleteOneComent(id);
   }
}
