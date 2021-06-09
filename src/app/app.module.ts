import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { UsersGestionComponent } from './admin/users-gestion/users-gestion.component';
import { RessourcesGestionComponent } from './admin/ressources-gestion/ressources-gestion.component';
import { StatistiqueComponent } from './admin/statistique/statistique.component';
import { SingleRessourceComponent } from './single-ressource/single-ressource.component';
import { LoginComponent } from './login/login.component';
import { CompteComponent } from './user/compte/compte.component';
import { TutorielComponent } from './tutoriel/tutoriel.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HistoricComponent } from './user/historic/historic.component';
import { FriendComponent } from './user/friend/friend.component';
import { FavorisComponent } from './user/favoris/favoris.component';
import { CreaRessourceComponent } from './user/crea-ressource/crea-ressource.component';
import { SharedComponent } from './user/shared/shared.component';
import { CompletedComponent } from './user/completed/completed.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { RessourceComponent } from './ressource/ressource.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    UsersGestionComponent,
    RessourcesGestionComponent,
    StatistiqueComponent,
    SingleRessourceComponent,
    LoginComponent,
    CompteComponent,
    TutorielComponent,
    HistoricComponent,
    FriendComponent,
    FavorisComponent,
    CreaRessourceComponent,
    SharedComponent,
    CompletedComponent,
    RessourceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    GoogleChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
