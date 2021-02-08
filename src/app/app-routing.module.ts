import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PreGameComponent } from './pages/pre-game/pre-game.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'pre-game/:id', component: PreGameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
