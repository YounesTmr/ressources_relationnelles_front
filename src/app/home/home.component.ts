import { Component, OnInit } from '@angular/core';
import { RessourceService } from '../services/ressource.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /**
   * 
   * Iniatilisation Formulaire des type ressource
   * Tableau des ressources
   * Lsites des nom de categorie
   * Diffeentes icon de fontawesome
   */
  nameSearchForm : FormGroup;
  typeRessource: FormGroup;
  allData = [];
  nameRessource = [];
  limitRessource = 3;
  dataSearch;

  fileLocalUrl = environment.fileLocalUrl;
  constructor(
    private ressourceService: RessourceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

    /**
   * 
   * Iniatilisation
   */
  ngOnInit(): void {
    this.initTypeForm();
    this.initNameSearchForm();
    this.getRessourceByRelation(this.typeRessource.get('type').value,this.typeRessource.get('sort').value,this.limitRessource);
  }

    /**
   * 
   * Recuperation des ressources par type
   */
  getRessourceByRelation(type,sort,limit){
    this.nameRessource.splice(0,this.nameRessource.length);
    this.ressourceService.getAllRessource(type,sort,limit).subscribe(
      reponse => {
          for (var val in reponse ){ 
            if(reponse[val].length > 0){
              this.nameRessource.push(val);
            }
         }
         this.allData = reponse;
      });
  }

    /**
   * 
   * Iniatilisation Formulaire
   */
  initTypeForm(){
    this.typeRessource = this.formBuilder.group({
      type: ['FileType',Validators.required],
      sort: ['latest',Validators.required],
    })
  }

  initNameSearchForm(){
    this.nameSearchForm = this.formBuilder.group({
      name: ['',Validators.required],
      idRessource:['',Validators.required]
    })
  }

    /**
   * 
   * Changmeent du type de ressource
   */
  updateTypeChoose(){
    this.getRessourceByRelation(this.typeRessource.get('type').value,this.typeRessource.get('sort').value,this.limitRessource);
  }

     /**
   * 
   * Changmeent du type de ressource
   */
  addLimitRessource(){
    this.limitRessource += 3;
    this.updateTypeChoose();
  }

       /**
   * 
   * Recherche par nom de ressource
   */
  searchByName(){
    this.ressourceService.getOneRessourceByName(this.nameSearchForm.get('name').value).subscribe(
      reponse => {
        this.dataSearch = reponse;
      });
  }

         /**
   * 
   * Envoie de l'utilisateur vers la ressource
   */
  goToRessource(){
    if(this.nameSearchForm.get('idRessource').value != ""){
      this.router.navigateByUrl('/Ressource/' + this.nameSearchForm.get('idRessource').value);
    }
  }
}
