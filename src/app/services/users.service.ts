import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from '../header/header.component';
import { Friend } from '../interfaces/friend';
import { Users } from '../interfaces/users';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  /**
   * 
   * Listes Utilisateurs
   * Liste Amis
   */
  users: Users[];
  friends: Friend[];

  constructor(
    private httpClient: HttpClient,
    private router : Router
  ) { }

    /**
   * 
   * Recuperation Un utilisateur
   */
  getOneUser(id) : Observable<Users> {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<Users>(environment.apiUrl + '/profile/' + id,{'headers':headers});
  }

      /**
   * 
   * Recuperation Un utilisateur
   */
  getOneUserbyUsername(username) : Observable<Users> {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<Users>(environment.apiUrl + '/profile/search/' + username,{'headers':headers});
  }

    /**
   * 
   * Recuperation tous les utilisateurs
   */
  getAllUsers(): Observable<Users[]> {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<Users[]>(environment.apiUrl + '/profile',{'headers':headers});
  }

     /**
   * 
   * Recuperation tous les utilisateurs
   */
  CheckUserToken(token): Observable<Users> {
    const headers = { 'Authorization': 'Bearer ' + token}
    return this.httpClient.get<Users>(environment.apiUrl + '/member',{'headers':headers});
  }

    /**
   * 
   * Changement visibiliter utilisateur (Bannis)
   */
  changeVisibility(id){
    const body=JSON.stringify(id);
    const headers = { 'content-type': 'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    this.httpClient.put<Users>(environment.apiUrl + '/admin/members/' + id + '/account', body,{'headers':headers} ).subscribe({
      next: data => {
        console.log("update succeful");
      },
      error: error => {
          console.error('There was an error!', error);
      }
  });
  }

    /**
   * 
   * Changment de status
   */
  changeStatus(id,status){
    const body=JSON.stringify(status);
    const headers = { 'content-type': 'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    this.httpClient.put<Users>(environment.apiUrl + '/admin/members/' + id + '/status', body,{'headers':headers} ).subscribe({
      next: data => {
        console.log("update succeful");
      },
      error: error => {
          console.error('There was an error!', error);
      }
  });
  }

    /**
   * 
   * Suppression Utilisateur
   */
  deleteOneUser(id) {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    this.httpClient.delete(environment.apiUrl + '/profile/' + id,{'headers':headers}).subscribe(() => console.log('Delete successful'));
  }


    /**
   * 
   * Ajout Utilisateur
   */
  addOneUser(user: Users) {
    const body=JSON.stringify(user);
    const headers = { 'content-type': 'application/json'}
     return this.httpClient.post<any>(environment.apiUrl + '/register', body,{'headers':headers} );

  }

      /**
   * 
   * Ajout Utilisateur
   */
       CheckUser(data) {
        const body=JSON.stringify(data);
        const headers = { 'content-type': 'application/json'}
        return this.httpClient.post<any>(environment.apiUrl + '/login', body,{'headers':headers} );
    
      }


    /**
   * 
   * Modification Utilisateur
   */
  updateOneUser(user: Users, id) {
    const body=JSON.stringify(user);
    const headers = { 'content-type': 'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    this.httpClient.put<any>(environment.apiUrl + '/profile/' + id, body,{'headers':headers} ).subscribe({
      next: data => {
        console.log("update succeful");
      },
      error: error => {
          console.error('There was an error!', error);
      }
  });

  }

    /**
   * 
   * Modification Password
   */
  updatePassword(user: Users, id) {
    const body=JSON.stringify(user);
    const headers = { 'content-type': 'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    this.httpClient.put<any>(environment.apiUrl + '/profile/' + id + '/password', body,{'headers':headers} ).subscribe({
      next: data => {
        console.log("update password succeful");
      },
      error: error => {
          console.error('There was an error!', error);
      }
  });

  }
  /**
   * 
   * Recuperation des amis
   */
  getAllFriends(id, type): Observable<Friend[]> {
    const headers = { 'content-type': 'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.get<Friend[]>(environment.apiUrl + '/profile/' + id + '/friends/' + type,{'headers':headers});
  }

       /**
   * 
   * Ajout amis
   */
  addFriend(data, id) {
    const body=JSON.stringify(data);
    const headers = { 'content-type': 'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    this.httpClient.post<any>(environment.apiUrl + '/profile/' + id +'/friends ', body,{'headers':headers} ).subscribe({
      next: data => {
        console.error('yeah');
      },
      error: error => {
          console.error('There was an error!', error);
      }
  });

  }

        /**
   * 
   * Ajout ressource ne favorite ou completer
   */
  AfavoriteOrComplete(data,id) {
    const body=JSON.stringify(data);
    const headers = { 'content-type': 'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    this.httpClient.post<any>(environment.apiUrl + '/profile/' + id +'/resources', body,{'headers':headers} ).subscribe({
      next: data => {
        console.log('Bravo ! ');
      },
      error: error => {
          console.error('There was an error!', error);
      }
  });

  }

          /**
   * 
   * Ajout ressource ne favorite ou completer
   */
  addShare(data,id) {
    const body=JSON.stringify(data);
    const headers = { 'content-type': 'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    this.httpClient.post<any>(environment.apiUrl + '/profile/' + id + '/share ', body,{'headers':headers} ).subscribe({
      next: data => {
        console.log('Post success ! ');
      },
      error: error => {
          console.error('There was an error!', error);
      }
  });

  }
}
