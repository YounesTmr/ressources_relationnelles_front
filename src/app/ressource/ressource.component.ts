import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ressource } from '../interfaces/ressource';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shared } from '../interfaces/shared';
import { Complete } from '../interfaces/complete';
import { Type } from '../interfaces/type';

@Injectable({
  providedIn: 'root'
})
export class RessourceService {
  /**
   *
   * Listes ressources
   */
  ressources: Ressource[];
  shared: Shared[];
  complete: Complete[];

  constructor(
    private httpClient: HttpClient
  ) { }

    /**
   *
   * Recuperation les ressources par type
   */
  getAllRessource(type,sort,limit): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + '/home/resources/' + type + '/' + sort + '/' + limit + '/1');
  }

      /**
   *
   * Recuperation les ressources par type
   */
  getAllRessourceByType(type,sort,limit,page): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + '/home/resources/' + type + '/' + sort + '/' + limit + '/' + page);
  }

    /**
   *
   * Recuperation d'une ressource
   */
  getOneRessource(id) : Observable<Ressource> {
    return this.httpClient.get<Ressource>(environment.apiUrl + '/resource/' + id);
  }

      /**
   *
   * Recuperation des ressource amis
   */
  geFriendRessource(id) : Observable<Shared[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    return this.httpClient.get<Shared[]>(environment.apiUrl + '/profile/' + id +'/shared',{'headers':headers});
  }

    /**
   *
   * Recuperation les ressources completer
   */
  getAllRessourceComplete(id): Observable<Complete[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    return this.httpClient.get<Complete[]>(environment.apiUrl + '/profile/' + id + '/completed',{'headers':headers});
  }

      /**
   *
   * Recuperation les ressources non validé par les modérateurs
   */
  getAllRessourceNoValidate(): Observable<Ressource[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    return this.httpClient.get<Ressource[]>(environment.apiUrl + '/admin/resources/toValidate',{'headers':headers});
  }

      /**
   *
   * Suppresssion de la ressource
   */
  deleteOneRessource(id){
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    return this.httpClient.delete<any>(environment.apiUrl + '/resource/' + id + '/delete',{'headers':headers}).subscribe({
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
   * Suppresssion d'un type de ressource
   */
  deleteOneType(type,id){
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    return this.httpClient.delete<any>(environment.apiUrl + '/resources/' + type + '/' + id,{'headers':headers}).subscribe({
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
   * Validation d'une ressource
   */
  validOneRessource(id) : Observable<any>{
    const body=JSON;
    const headers = { 'content-type': 'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')}
    return this.httpClient.put<any>(environment.apiUrl + '/admin/resources/' + id + '/validate', body,{'headers':headers});

  }

       /** /resource/find/{expression}
   *
   * Recuperation les ressources favorie
   */
  getAllRessourceFavorites(id): Observable<Complete[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    return this.httpClient.get<Complete[]>(environment.apiUrl + '/profile/' + id + '/favorites',{'headers':headers});
  }

/*
  *
  * Recuperation d'une ressource par nom
  */
 getOneRessourceByName(name): Observable<Ressource[]> {
   return this.httpClient.get<Ressource[]>(environment.apiUrl + '/resource/find/' + name);
 }
    /**
   *
   * ajout ressource sans fichier
   */
  addRessourceText(type,resource){
    
    var postOrDraft;

    if(type == true){
      postOrDraft = "/resource/createInDraft/text";
    }else{
      postOrDraft = "/resource/createToPost/text";
    }
    const body=JSON.stringify(resource);
    const headers = { 'content-type': 'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    return this.httpClient.post<any>(environment.apiUrl + postOrDraft, body,{'headers':headers} );
  }

   /**
   *
   * update ressource en brouillon 2eme fois
   */
  UpdateDraftRessource(id,resource){
    
    const body=JSON.stringify(resource);
    const headers = { 'content-type': 'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    return this.httpClient.put<any>(environment.apiUrl + "/resource/"+ id +"/updateInDraft/text", body,{'headers':headers} )
  }

      /**
   *
   * Update draft to post text
   */
  UpdateDrafttoPostRessourceText(resource,id){
    
    const body=JSON.stringify(resource);
    const headers = { 'content-type': 'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    return this.httpClient.put<any>(environment.apiUrl + "/resource/" + id + "/updateToPost/text", body,{'headers':headers} );
  }
    /**
   *
   * update draft to post
   */
  UpdateToPostRessource(id,resource,file,image){

    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')};

    let formDate = new FormData();

    formDate.append('file', file);

    formDate.append('image', image);

    const json = JSON.stringify(resource);

    const blob = new Blob([json], {
      type: "application/json",
    });

    formDate.append('register',blob);

    return this.httpClient.put<any>(environment.apiUrl + "/resource/" + id + "/updateToPost", formDate,{'headers':headers} )
  }

    /**
   *
   * ajout ressource avec fichier
   */
  addRessource(type,resource,file,image){

    try{
      const img = image.name.split('.').pop();
      const fil = file.name.split('.').pop();
      if(resource.fileType === "IMAGE"){
        if(fil !== "jpeg" && fil !== "png" && fil !== "jpg" && fil !== "gif" && fil !== "img"){
          throw "file error"
        }
        if(img !== "jpeg" && img !== "png" && img !== "jpg" && img !== "img"){
          throw "image couverture error"
        }
      }else if(resource.fileType === "TEXT"){
        if(fil !== "txt" && fil !== "pdf" && fil !== "odt" && fil !== "docx" && fil !== "doc"){
          throw "file error"
        }
        if(img !== "jpeg" && img !== "png" && img !== "jpg" && img !== "img"){
          throw "image couverture error"
        }
      }else if(resource.fileType === "VIDEO"){
        if(fil !== "mov" && fil !== "mp4" && fil !== "avi" && fil !== "flv" && fil !== "wmf"){
          throw "file error"
        }
        if(img !== "jpeg" && img !== "png" && img !== "jpg" && img !== "img"){
          throw "image couverture error"
        }
      }else if(resource.fileType === "AUDIO"){
        if(fil !== "mp3" && fil !== "flac"){
          throw "file error"
        }
        if(img !== "jpeg" && img !== "png" && img !== "jpg" && img !== "img"){
          throw "image couverture error"
        }
      }
      throw "test";
      var postOrDraft;

      if(type == true){
        postOrDraft = "/resource/createInDraft";
      }else{
        postOrDraft = "/resource/createToPost";
      }

      const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')};

      let formDate = new FormData();

      formDate.append('file', file);

      formDate.append('image', image);

      const json = JSON.stringify(resource);

      const blob = new Blob([json], {
        type: "application/json",
      });

      formDate.append('register',blob);

      return this.httpClient.post<any>(environment.apiUrl + postOrDraft, formDate,{'headers':headers} );
    }catch(err){
      alert(`error : ${err}`);
    }
    
  }
      /**
   *
   * Update ressource Favorite
   */
  UpdateRessourceFavoriteOrCOmplete(idUser,idRessource,resource){
    const body=JSON.stringify(resource);
    const headers = { 'content-type': 'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    this.httpClient.put<any>(environment.apiUrl + '/profile/' + idUser + '/resources/' + idRessource + '/update ', body,{'headers':headers} ).subscribe({
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
   * Recuperation des ressources en brouillon
   */
  getDraftRessources() : Observable<Ressource[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    return this.httpClient.get<Ressource[]>(environment.apiUrl + "/resource/drafts",{'headers':headers});
  }

    /**
   *
   * Recuperation des relations
   */
  getAllRelation() : Observable<Type[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    return this.httpClient.get<Type[]>(environment.apiUrl + "/resources/RelationshipTypes",{'headers':headers});
  }


    /**
   *
   * Recuperation des langues
   */
  getAllLangue() : Observable<Type[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    return this.httpClient.get<Type[]>(environment.apiUrl + '/resources/Languages',{'headers':headers});
  }


    /**
   *
   * Recuperation des types
   */
  getAllType() : Observable<Type[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    return this.httpClient.get<Type[]>(environment.apiUrl + "/resources/ResourceTypes",{'headers':headers});
  }


    /**
   *
   * Recuperation des catégories
   */
  getAllCategorie() : Observable<Type[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    return this.httpClient.get<Type[]>(environment.apiUrl + "/resources/ResourceCategories",{'headers':headers});
  }


    /**
   *
   * Recuperation des type de fichiers
   */
  getAllFileType() : Observable<Type[]> {
    const headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    return this.httpClient.get<Type[]>(environment.apiUrl + "/resources/FileTypes",{'headers':headers});
  }


    /**
   *
   * ajout option ressource
   */
  addRessourceType(typeUrl,typeName){
    const body=JSON.stringify(typeName);
    const headers = { 'content-type': 'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    this.httpClient.post<any>(environment.apiUrl + '/resources/'+ typeUrl, body,{'headers':headers} ).subscribe({
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
   * Remise de la ressource en brouillon
   */
  resourceNotGood(ressource,id){
    const body=JSON.stringify(ressource);
    const headers = { 'content-type': 'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')};
    this.httpClient.put<any>(environment.apiUrl + '/resource/' + id + '/updateInDraft', body,{'headers':headers} ).subscribe({
      next: data => {
        console.log("update succeful");
      },
      error: error => {
          console.error('There was an error!', error);
      }
  });


  }








}
