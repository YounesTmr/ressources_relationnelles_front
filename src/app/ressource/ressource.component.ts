import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RessourceService } from '../services/ressource.service';
import { faVideo, faFileAlt, faVolumeUp, faImage } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.scss']
})
export class RessourceComponent implements OnInit {
/**
 * Varibale globale
 * Toutes les donnée
 * Toutes les noms des type de donnée
 * Numero de page actuel
 * Nombre de ressource par page
 * Liste des icons
 */
  allData = [];
  nameRessource = [];
  page = 1;
  numberRessourceByPage;

  faVideo = faVideo;
  faFileAlt = faFileAlt
  faVolumeUp = faVolumeUp;
  faImage = faImage;
  fileLocalUrl = environment.fileLocalUrl;

  /**
   * 
   * Récuperation des class necessaire
   */
  constructor(
    private route: ActivatedRoute,
    private ressourceService: RessourceService
    ) { }

  ngOnInit(): void {
    this.getAllRessourceByType(this.route.snapshot.paramMap.get('type'),this.route.snapshot.paramMap.get('choose'),this.page);
  }

  /**
   * 
   * Recherche des ressource par type, choix et par numero de page (9 par 9)
   */
  getAllRessourceByType(type,choose,page){
    this.nameRessource.splice(0,this.nameRessource.length);
    this.allData.splice(0,this.allData.length);
    this.ressourceService.getAllRessourceByType(type,'latest',9,this.page).subscribe(
      reponse => {
          for (var val in reponse ){
            if(choose == val){
              this.nameRessource.push(val);
              this.allData = reponse[val]
              this.numberRessourceByPage = this.allData.length;
              console.log(this.allData.length);
            }
         }
      });
  }

  /**
   * PAge suivante
   */
  addLimitRessource(){
    this.page++;
    this.getAllRessourceByType(this.route.snapshot.paramMap.get('type'),this.route.snapshot.paramMap.get('choose'),this.page);
  }

  /**
   *Page précedente
   */
  lowerLimitRessource(){
    this.page--;
    this.getAllRessourceByType(this.route.snapshot.paramMap.get('type'),this.route.snapshot.paramMap.get('choose'),this.page);
  }

}
