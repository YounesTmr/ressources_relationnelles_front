import { Component, OnInit } from '@angular/core';
import {StatisticsService} from 'src/app/services/statistics.service';
import {HistoricService} from 'src/app/services/historic.service';
import {Chart} from 'src/app/interfaces/chart';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { GoogleChartsModule } from 'angular-google-charts';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
/**
 * Création des variables globales
 * Les varaibles serviront a créer les graphiques
 *
 */
  chartValues : Chart[];

  nbResources : number;
  nbViews : number;
  nbMembers : number;

  typeDonut = 'PieChart';
  optionsDonut = {
    pieHole:0.4
  };
  widthDonut = 500;
  heightDonut = 250;

  titleTypeResource = 'Répartiton des ressources par type';
  dataTypeResource : [String,number][];

  titleCategoryResource = 'Répartiton des ressources par catégorie';
  dataCategoryResource : [String,number][];

  titleFileType = 'Répartiton des ressources par type de fichiers';
  dataFileType : [String,number][];

  titleRelationshipType = 'Répartiton des ressources par type de relations';
  dataRelationshipType : [String,number][];

  titleStatus = 'Répartiton des membres par statut';
  dataStatus : [String,number][];

  titleCounties = 'Répartition des membres par département';
  dataCounties : Chart[];


  typeColumns = 'ColumnChart';
  optionsColumns = {
  };
  widthColumns = 500;
  heightColumns = 250;

  titleViews = 'Quantité de vues par jour';
  dataViews : [String,number][];
  columnNamesViews  = ['jours','total'];

  titleShares = 'Quantité de partage de ressources par jour';
  dataShares : [String,number][];
  columnNamesShares  = ['jours','total'];

  titleAges = 'Répartition des membres par age';
  dataAges : [String,number][];
  columnNamesAges  = ['tranche d\'âge','total'];








/**
 *
 * récupération des services
 */

  constructor(
    private statisticsService : StatisticsService,
    private historicService : HistoricService,
    private router: Router,
    private userService : UsersService ) { }

    /**
     * Initialisation des graphisme en recherchant toutes les données possible
     */
  ngOnInit(): void {
    if(sessionStorage.getItem('token')){
      this.checkUsers(sessionStorage.getItem('token'));
    }else{
      this.router.navigateByUrl('/');
    }

    // get resources data
    this.getCountResourcesByResourceTypes();
    this.getCountResourcesByResourceCategories();
    this.getCountResourcesByFileTypes();
    this.getCountResourcesByRelationshipTypes();

    this.getCountResources();
    this.getCountViews();

    this.getCountSharesPerDay();
    this.getCountViewsPerDay();

    // get members data
    this.getCountMembers();
    this.getCountStatusMembers();
    this.getCountAgeMembers();
    this.getCountCountiesMembers();


  }
        /**
   *
   * Recuperation donnée utilisateur
   */
  checkUsers(token){
    this.userService.CheckUserToken(token).subscribe(
      reponse => {
        if(reponse.status == 'ADMINISTRATOR' || reponse.status == 'SUPER_ADMINISTRATOR'){

        }else{
          this.router.navigateByUrl('/');
        }
      });
    }

/**
 * Récuperation des donnée
 * Par type de ressource
 * PAr catégorie
 * PAr type de fichier
 * PAr relation
 * Nombre de vue total
 * nombre total de ressource
 * nombre de share par jour
 * Nombre de vue par jour
 *
 */
  getCountResourcesByResourceTypes(){
    this.statisticsService.getCountResourcesByResourceTypes().subscribe(
      reponse => {
          this.chartValues = reponse;
          this.dataTypeResource = [];
          this.chartValues.forEach( chart => {
            this.dataTypeResource.push([chart.name,chart.total]);
          });
      });
  }

  getCountResourcesByResourceCategories(){
    this.statisticsService.getCountResourcesByResourceCategories().subscribe(
      reponse => {
          this.chartValues = reponse;
          this.dataCategoryResource = [];
          this.chartValues.forEach( chart => {
            this.dataCategoryResource.push([chart.name,chart.total]);
          });
      });
  }

  getCountResourcesByFileTypes(){
    this.statisticsService.getCountResourcesByFileTypes().subscribe(
      reponse => {
          this.chartValues = reponse;
          this.dataFileType = [];
          this.chartValues.forEach( chart => {
            this.dataFileType.push([chart.name,chart.total]);
          });
      });
  }

  getCountResourcesByRelationshipTypes(){
    this.statisticsService.getCountResourcesByRelationshipTypes().subscribe(
      reponse => {
          this.chartValues = reponse;
          this.dataRelationshipType = [];
          this.chartValues.forEach( chart => {
            this.dataRelationshipType.push([chart.name,chart.total]);
          });
      });
  }

  getCountResources(){
    this.statisticsService.getCountResources().subscribe(
      reponse => {
          this.nbResources = reponse.total;
      });
  }

  getCountViews(){
    this.statisticsService.getCountViews().subscribe(
      reponse => {
          this.nbViews = reponse.total;
      });
  }

  getCountSharesPerDay(){
    this.statisticsService.getCountSharePerDay().subscribe(
      reponse => {
          this.chartValues = reponse;
          this.dataShares = [];
          this.chartValues.forEach( chart => {
            this.dataShares.push([chart.name,chart.total]);
          });
      });
  }

  getCountViewsPerDay(){
    this.statisticsService.getCountViewPerDay().subscribe(
      reponse => {
          this.chartValues = reponse;
          this.dataViews = [];
          this.chartValues.forEach( chart => {
            this.dataViews.push([chart.name,chart.total]);
          });
      });
  }

  // members data

  getCountMembers(){
    this.statisticsService.getCountMembers().subscribe(
      reponse => {
          this.nbMembers = reponse.total;
      });
  }

  getCountStatusMembers(){
    this.statisticsService.getCountStatusMembers().subscribe(
      reponse => {
          this.chartValues = reponse;
          this.dataStatus = [];
          this.chartValues.forEach( chart => {
            this.dataStatus.push([chart.name,chart.total]);
          });
      });
  }

  getCountAgeMembers(){
    this.statisticsService.getCountAgeMembers().subscribe(
      reponse => {
          this.chartValues = reponse;
          this.dataAges = [];
          this.chartValues.forEach( chart => {
            this.dataAges.push([chart.name,chart.total]);
          });
      });
  }

  getCountCountiesMembers(){
    this.statisticsService.getCountCountiesMembers().subscribe(
      reponse => {
          this.dataCounties = reponse;
      });
  }


}
