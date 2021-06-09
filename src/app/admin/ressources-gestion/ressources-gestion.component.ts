import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ressource } from 'src/app/interfaces/ressource';
import { Type } from 'src/app/interfaces/type';
import { RessourceService } from 'src/app/services/ressource.service';
import { UsersService } from 'src/app/services/users.service';
import { faSyncAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ressources-gestion',
  templateUrl: './ressources-gestion.component.html',
  styleUrls: ['./ressources-gestion.component.scss']
})
export class RessourcesGestionComponent implements OnInit {
/**
 * Variable globale liste des ressource/ liste des créateurs et Update qui permet d'afficher la page qu'en on recois les ressources
 */
  allRessource : Ressource[];
  GestionFormAdd: FormGroup;
  typeFormDelete: FormGroup;
  allUsers = [];
  update = false;
  refreshPage = false;

  faSyncAlt = faSyncAlt;

  allLangue : Type[];
  allCategorie : Type[];
  allRelation : Type[];
  allFiles : Type[];
  allType : Type[];

  /**
   * 
   * Recupération des services
   * 
   */
  constructor(
    private ressourceService: RessourceService,
    private userService:UsersService,
    private formBuilder: FormBuilder
  ) { }

  /**
   * Oninit recherche es ressource no valider
   */
  ngOnInit(): void {
    this.inittypeFormDelete();
    this.initGestionFormAdd();
    this.getAllRessource();
    this.getAllOptions();
  }
    /**
   * 
   * Iniatilisation Formulaire
   */
  inittypeFormDelete(){
    this.typeFormDelete = this.formBuilder.group({
      id: [''],
      name: ['',Validators.required]
    })
  }

     /**
   * 
   * Iniatilisation Formulaire
   */
  initGestionFormAdd(){
    this.GestionFormAdd = this.formBuilder.group({
      id: [''],
      name: ['',Validators.required]
    })
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


  /**
   * Ajoout d'un type
   */
  addStatusChoose(typeUrl,id){
    this.GestionFormAdd.get('id').setValue(id);
    this.ressourceService.addRessourceType(typeUrl,this.GestionFormAdd.value);

    if(typeUrl == 'Languages'){
      this.allLangue.push(this.GestionFormAdd.value)
    }else if(typeUrl == 'ResourceTypes'){
      this.allType.push(this.GestionFormAdd.value)
    }else if(typeUrl == 'ResourceCategories'){
      this.allCategorie.push(this.GestionFormAdd.value)
    }else if(typeUrl == 'RelationshipTypes'){
      this.allRelation.push(this.GestionFormAdd.value)
    }else{
      this.allFiles.push(this.GestionFormAdd.value)
    }

    this.GestionFormAdd.get('name').setValue("");
    this.refreshPage = true;
  }

  refresh(){
    this.ngOnInit();
    this.refreshPage = false;
  }

  /**
   * Recupération des ressources
   */
  getAllRessource(){
    this.ressourceService.getAllRessourceNoValidate().subscribe(
      reponse => {
          this.allRessource = reponse;
          for (let index = 0; index < reponse.length; index++) {
            this.getOneUser(reponse[index].creator['id'])       
          }
    });
  }

/**
 * 
 * Recupération des créateur de ressource
 */
  getOneUser(id){
    this.userService.getOneUser(id).subscribe(
      reponse => {
        this.allUsers.push(reponse.username);
        this.update = true;
    });

  }

  /**
   * 
   * Evenement Click validation de la ressource
   */
  validRessource(id){
    this.ressourceService.validOneRessource(id).subscribe({
      next: data => {
        console.log('Update success');
        this.allRessource.splice(0,this.allRessource.length);
        this.refresh();
      },
      error: error => {
          console.error('There was an error!', error);
      }
  });;
  }


  /**
   * 
   * Evenement click suppression de la ressource 
   */
  deleteRessource(id){
    this.ressourceService.deleteOneRessource(id);
    this.refresh();
  }


    /**
   * 
   * Evenement click suppression d'un type
   */
  deleteOneType(type){
    var dataToDelete;
    if(type == "Language"){
      dataToDelete = this.allLangue[this.typeFormDelete.get('name').value];
    }else if(type == "FileType"){
      dataToDelete = this.allFiles[this.typeFormDelete.get('name').value];
    }else if(type == "RelationshipType"){
      dataToDelete = this.allRelation[this.typeFormDelete.get('name').value];
    }else if(type == "ResourceCategory"){
      dataToDelete = this.allCategorie[this.typeFormDelete.get('name').value];
    }else if(type == "ResourceType"){
      dataToDelete = this.allType[this.typeFormDelete.get('name').value];
    }

    this.ressourceService.deleteOneType(type,dataToDelete['id']);
    this.refresh();
  }
}
