import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  comments: Comment[];

  constructor(
    private httpClient: HttpClient
  ) { }

/**
 * 
 * Recuperation des comments par ressource
 */
  getCommentByRessource(id): Observable<Comment[]> {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<Comment[]>(environment.apiUrl + '/comments/resource/' + id,{'headers':headers});
  }


/**
 * 
 * Suppression d'un commentaire
 */
  deleteOneComent(id){
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    return this.httpClient.delete<any>(environment.apiUrl + '/comments/' + id,{'headers':headers}).subscribe({
      next: data => {
        console.log("Delete succeful");
      },
      error: error => {
          console.error('There was an error!', error);
      }
  });
  }

/**
 * 
 * Ajout d'un commentaire
 */
  addComment(data){
    const body=JSON.stringify(data);
    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    this.httpClient.post<any>(environment.apiUrl + '/comments', body,{'headers':headers} ).subscribe({
      next: data => {
        console.log("Commentaire ajout réussi :)");
      },
      error: error => {
          console.error('There was an error!', error);
      }
  });
  }
}
