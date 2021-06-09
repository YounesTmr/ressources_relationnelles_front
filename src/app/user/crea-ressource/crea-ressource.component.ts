import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ressource } from 'src/app/interfaces/ressource';
import { Router } from '@angular/router';
import { Type } from 'src/app/interfaces/type';
import { Users } from 'src/app/interfaces/users';
import { RessourceService } from 'src/app/services/ressource.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-crea-ressource',
  templateUrl: './crea-ressource.component.html',
  styleUrls: ['./crea-ressource.component.scss']
})
export class CreaRessourceComponent implements OnInit {

  user : Users;
  ressources: Ressource[];
  ressourceForm: FormGroup;
  reponseRadio;
  fileNotText = false;

  allLangue : Type[];
  allCategorie : Type[];
  allRelation : Type[];
  allFiles : Type[];
  allType : Type[];

  NameImage = "Image de couverture";

  NameFile = "Fichier lier a la ressource";

  file: File;
  image: File;
  ressourceDraft: Ressource[];
  updateDraft = false;
  idRessourceUpdate = 0;

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private ressourceService: RessourceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateDraft = false;
    this.idRessourceUpdate;
    if(sessionStorage.getItem('token') != null){
      this.checkUsers(sessionStorage.getItem('token'));
    }else{
      this.router.navigateByUrl('/');
    }
   this.idRessourceUpdate = 0;
   this.updateDraft = false;
  }

  getUser(id){
    this.userService.getOneUser(id).subscribe(
      reponse => {
          this.user = reponse;
          this.initRessourceCrea();
          this.getAllOptions();
          this.getDraftRessources();
      });
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


  initRessourceCrea(){
    this.ressourceForm = this.formBuilder.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      contentText: '',
      language: ['',Validators.required],
      resourceType: ['',Validators.required],
      resourceCategory: ['',Validators.required],
      relationshipType: ['',Validators.required],
      fileType: ['',Validators.required],
      creatorId: this.user.id,
    })
  }

  SubmitRessource(){
  if(this.reponseRadio != true){
    if(this.idRessourceUpdate > 0){
      if(this.file == null && this.image == null){
        this.ressourceService.UpdateDrafttoPostRessourceText(this.ressourceForm.value,this.idRessourceUpdate).subscribe({
          next: data => {
            console.log("create succeful");
            this.ngOnInit();
          },
          error: error => {
              console.error('There was an error!', error);
          }
      });
      }else{      
      this.ressourceService.UpdateToPostRessource(this.idRessourceUpdate,this.ressourceForm.value,this.file,this.image).subscribe({
        next: data => {
          console.log("create succeful");
          this.idRessourceUpdate = 0;
          this.ngOnInit();
        },
        error: error => {
            console.error('There was an error!', error);
        }
    });

      }
    }else{
      this.ressourceService.addRessource(this.reponseRadio,this.ressourceForm.value,this.file,this.image).subscribe({
        next: data => {
          console.log("update succeful");
          this.ngOnInit();
        },
        error: error => {
            console.error('There was an error!', error);
        }
    });;
    }
  }else{
    if(this.idRessourceUpdate > 0){
      this.ressourceService.UpdateDraftRessource(this.idRessourceUpdate,this.ressourceForm.value).subscribe({
        next: data => {
          console.log("update succeful");
          this.idRessourceUpdate = 0;
          this.ngOnInit();
        },
        error: error => {
            console.error('There was an error!', error);
        }
    });
    }else{
      this.ressourceService.addRessourceText(this.reponseRadio,this.ressourceForm.value).subscribe({
        next: data => {
          console.log("create succeful");
          this.ngOnInit();
        },
        error: error => {
            console.error('There was an error!', error);
        }
    });
    }
  }

  this.reponseRadio;
  this.ressourceForm.get('name').setValue('');
  this.ressourceForm.get('description').setValue('');
  this.ressourceForm.get('contentText').setValue('');
  this.ressourceForm.get('language').setValue('');
  this.ressourceForm.get('resourceType').setValue('');
  this.ressourceForm.get('resourceCategory').setValue('');
  this.ressourceForm.get('relationshipType').setValue('');
  this.ressourceForm.get('fileType').setValue('');
  this.ressourceForm.get('creatorId').setValue('');

  this.NameImage = "Image de couverture";

  this.NameFile = "Fichier lier a la ressource";
  }

 /**
   * 
   * Evenement click suppression de la ressource 
   */
  deleteRessource(id){
    this.ressourceService.deleteOneRessource(id);
    this.ngOnInit();
  }
  /**
   * evenenement dans le formulaire
   */


  changeImagefile(event){
    this.image = <File>event.target.files[0];
    this.NameImage = this.image.name
  }

  changefile(event){
    this.file = <File>event.target.files[0];
    this.NameFile = this.file.name
  }

  changeRadio(event){
    this.reponseRadio = event;
  }

  /**
   * Recupération des ressource en brouillon
   */
  getDraftRessources(){
    this.ressourceService.getDraftRessources().subscribe(
      reponse => {
          this.ressourceDraft = reponse;
    });
  }

  /**
   * Recupération des options
   */
  update(singleRessource : Ressource,id){
    this.ressourceForm.get('name').setValue(singleRessource.name);
    this.ressourceForm.get('description').setValue(singleRessource.description);
    this.ressourceForm.get('contentText').setValue(singleRessource.contentText);
    this.ressourceForm.get('language').setValue(singleRessource.language['name']);
    this.ressourceForm.get('resourceType').setValue(singleRessource.resourceType['name']);
    this.ressourceForm.get('resourceCategory').setValue(singleRessource.resourceCategory['name']);
    this.ressourceForm.get('relationshipType').setValue(singleRessource.relationshipType['name']);
    this.ressourceForm.get('fileType').setValue(singleRessource.fileType['name']);
    this.ressourceForm.get('creatorId').setValue(singleRessource.creator['id']);
    this.updateDraft = true;
    this.idRessourceUpdate = singleRessource.id;
  }
  /**
   * Recupération des options
   */
  getAllOptions(){
    this.ressourceService.getAllCategorie().subscribe(
      reponse => {
          this.allCategorie = reponse;
    });
    this.ressourceService.getAllFileType().subscribe(
      reponse => {
          this.allFiles = reponse;
    });
    this.ressourceService.getAllLangue().subscribe(
      reponse => {
          this.allLangue = reponse;
    });
    this.ressourceService.getAllRelation().subscribe(
      reponse => {
          this.allRelation = reponse;
    });
    this.ressourceService.getAllType().subscribe(
      reponse => {
          this.allType = reponse;
    });
  }
}
