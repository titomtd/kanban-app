import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from "./members/members.component";
import { BoardDetailComponent } from "./board-detail/board-detail.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '', component: HomeComponent, data: {activeTab: 'home'}},
  { path: 'members', component: MembersComponent},
  { path: 'board/:boardId', component: BoardDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
