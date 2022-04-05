import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from "@angular/forms";
import { BoardComponent } from './components/board/board.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MembersComponent } from './members/members.component';
import { MemberComponent } from './components/member/member.component';
import { BoardDetailComponent } from './board-detail/board-detail.component';
import { SectionComponent } from './components/section/section.component';
import { MenuComponent } from './components/menu/menu.component';
import { CardComponent } from './components/card/card.component';
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoardComponent,
    MembersComponent,
    MemberComponent,
    BoardDetailComponent,
    SectionComponent,
    MenuComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
