import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chart } from '../interfaces/chart';
import { KPI } from '../interfaces/KPI';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  chart :Chart;

  constructor(private httpClient: HttpClient ) { }

  /**
   * Liste des requetes permettant de recupérer les données pour la page statistiques Admin et par User
   */

   // *******************************************************************
   // bloc resources
   //
  getCountResourcesByResourceTypes(): Observable<Chart[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<Chart[]>(environment.apiUrl + '/admin/stats/count/ResourceTypes',{'headers':headers});
  }

  getCountResourcesByResourceCategories(): Observable<Chart[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<Chart[]>(environment.apiUrl + '/admin/stats/count/ResourceCategories',{'headers':headers});
  }

  getCountResourcesByFileTypes(): Observable<Chart[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<Chart[]>(environment.apiUrl + '/admin/stats/count/FileTypes',{'headers':headers});
  }

  getCountResourcesByRelationshipTypes(): Observable<Chart[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<Chart[]>(environment.apiUrl + '/admin/stats/count/RelationshipTypes',{'headers':headers});
  }

  getCountResources(): Observable<KPI> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<KPI>(environment.apiUrl + '/admin/stats/count/resources',{'headers':headers});
  }

  getCountViews(): Observable<KPI> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<KPI>(environment.apiUrl + '/admin/stats/count/resourceViews',{'headers':headers});
  }

  getCountSharePerDay(): Observable<Chart[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<Chart[]>(environment.apiUrl + '/admin/stats/count/action/SHARE',{'headers':headers});
  }

  getCountViewPerDay(): Observable<Chart[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<Chart[]>(environment.apiUrl + '/admin/stats/count/action/CONSULT',{'headers':headers});
  }

   // *******************************************************************
   // bloc members
   //

  getCountCountiesMembers(): Observable<Chart[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<Chart[]>(environment.apiUrl + '/admin/stats/count/counties',{'headers':headers});
  }

  getCountStatusMembers(): Observable<Chart[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<Chart[]>(environment.apiUrl + '/admin/stats/count/status',{'headers':headers});
  }

  getCountAgeMembers(): Observable<Chart[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<Chart[]>(environment.apiUrl + '/admin/stats/count/ages',{'headers':headers});
  }

  getCountMembers(): Observable<KPI> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<KPI>(environment.apiUrl + '/admin/stats/count/members',{'headers':headers});
  }

  // *******************************************************************
   // individual statistics
   //

  getCountFavoritesByUser(id): Observable<KPI> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<KPI>(environment.apiUrl + '/profile/' + id + '/stats/count/favorites',{'headers':headers});
  }

  getCountCompletesByUser(id): Observable<KPI> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<KPI>(environment.apiUrl + '/profile/' + id +'/stats/count/completed',{'headers':headers});
  }

  getCountCreatedResourcesByUser(id): Observable<KPI> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<KPI>(environment.apiUrl + '/profile/' + id +'/stats/count/creations',{'headers':headers});
  }

  getCountFriendsByUser(id): Observable<KPI> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<KPI>(environment.apiUrl + '/profile/' + id + '/stats/count/friends',{'headers':headers});
  }

}
