import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevTestsComponent } from './components/dev-tests/dev-tests.component';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GridDemoComponent } from './containers/grid-demo/grid-demo.component';

const routes: Routes = [
  { path: 'grid', component: GridDemoComponent },

  { path: 'dev-tests', component: DevTestsComponent },
  { path: 'getting-started', component: GettingStartedComponent },
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
