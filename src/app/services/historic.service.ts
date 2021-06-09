import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Historic } from '../interfaces/historic';

@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  historics:Historic;

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Récuperatio nde l'historique par utilisateur
   */
  getAllhistoricByUser(id): Observable<Historic[]> {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<Historic[]>(environment.apiUrl + '/profile/' + id + '/historic',{'headers':headers});
  }

    /**
   * Récuperatio nde l'historique
   */
  getAllhistoric(): Observable<Historic[]> {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<Historic[]>(environment.apiUrl + '/admin/historic',{'headers':headers});
  }

        /**
   * 
   * Création historique pour une action
   */
AddHistoric(data) {
    const body=JSON.stringify(data);
    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    this.httpClient.post<any>(environment.apiUrl + '/admin/historic', body,{'headers':headers} ).subscribe({
      next: data => {
        console.log("Historique ajout réussi :)");
      },
      error: error => {
          console.error('There was an error!', error);
      }
  });
}

}
