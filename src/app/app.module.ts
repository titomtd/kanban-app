import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {ReactiveFormsModule} from "@angular/forms";
import { BoardComponent } from './components/board/board.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MembersComponent } from './members/members.component';
import { MemberComponent } from './components/member/member.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoardComponent,
    MembersComponent,
    MemberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
