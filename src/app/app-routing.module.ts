import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { RessourcesGestionComponent } from './admin/ressources-gestion/ressources-gestion.component';
import { StatistiqueComponent } from './admin/statistique/statistique.component';
import { UsersGestionComponent } from './admin/users-gestion/users-gestion.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RessourceComponent } from './ressource/ressource.component';
import { SingleRessourceComponent } from './single-ressource/single-ressource.component';
import { TutorielComponent } from './tutoriel/tutoriel.component';
import { CompletedComponent } from './user/completed/completed.component';
import { CompteComponent } from './user/compte/compte.component';
import { CreaRessourceComponent } from './user/crea-ressource/crea-ressource.component';
import { FavorisComponent } from './user/favoris/favoris.component';
import { FriendComponent } from './user/friend/friend.component';
import { HistoricComponent } from './user/historic/historic.component';
import { SharedComponent } from './user/shared/shared.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Accueil', component: HomeComponent},
  {path: 'Admin/Ressources', component: RessourcesGestionComponent},
  {path: 'Admin/Dashboard', component: StatistiqueComponent},
  {path: 'Admin/Utilisateurs', component: UsersGestionComponent},
  {path: 'Admin/Statistique', component: StatistiqueComponent},
  {path: 'Ressource/:id', component: SingleRessourceComponent},
  {path: 'AllRessource/:type/:choose', component: RessourceComponent},
  {path: 'Profil', component: CompteComponent},
  {path: 'Profil/Complete', component: CompletedComponent},
  {path: 'Profil/Favoris', component: FavorisComponent},
  {path: 'Profil/Amis', component: FriendComponent},
  {path: 'Profil/Amis/Shared/:id', component: SharedComponent},
  {path: 'Profil/Historique', component: HistoricComponent},
  {path: 'Profil/CreationRessource', component: CreaRessourceComponent},
  {path: 'Profil/:username', component: CompteComponent},
  {path: 'Tutoriel', component: TutorielComponent},
  {path: 'Login', component: LoginComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
