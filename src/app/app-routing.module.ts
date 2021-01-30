import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreGameComponent } from './pages/pre-game/pre-game.component'; 

const routes: Routes = [
  { path: 'pre-game', component: PreGameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
