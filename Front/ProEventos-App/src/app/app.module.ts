import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { InfraModule } from './componentes/_infra/infra.module';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { ContatosComponent } from './componentes/contatos/contatos.component';
import { PalestrantesComponent } from './componentes/palestrantes/palestrantes.component';
import { HomeComponent } from './componentes/home/home.component';
import { SobreComponent } from './componentes/sobre/sobre.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './componentes/auth/login/login.component';
import { RegisterComponent } from './componentes/auth/register/register.component';
import { NavComponent } from './template/nav/nav.component';
import { FooterComponent } from './template/footer/footer.component';
import { TokenApiService } from './interceptors/token-api.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ContatosComponent,
    PalestrantesComponent,
    SobreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserAnimationsModule,
    InfraModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot(environment.TOAST_CONFIG),
    CarouselModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenApiService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
