import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { GridDemoComponent } from './containers/grid-demo/grid-demo.component';
import { HomeComponent } from './components/home/home.component';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';
import { DevTestsComponent } from './components/dev-tests/dev-tests.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { MxGridModule } from 'projects/mx-lib/src/public-api';
import { map, catchError } from 'rxjs/operators';
import { Observable, ObservableInput, of } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApiDocComponent } from './components/api-doc/api-doc.component';
import { ApiDocModule } from './components/api-doc/api-doc.module';
import { DocApiService } from './services/doc-api.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GettingStartedComponent,
    NotFoundComponent,
    DevTestsComponent,
    GridDemoComponent,
    ApiDocComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatMenuModule,
    MatTabsModule,
    MxGridModule,
    ApiDocModule,
  ],
  providers: [
    DocApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function loadConfiguration(http: HttpClient, config: any): (() => Promise<boolean>) {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      http.get('./config.json')
        .pipe(
          map((x: any) => {
            config.restEndpoint = x.restEndpoint;
            config.enableDebug = x.enableDebug;
            resolve(true);
          }),
          catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
            if (x.status !== 404) {
              resolve(false);
            }
            // config.restEndpoint = environment.baseUrl;
            // config.enableDebug = false;
            resolve(true);
            return of({});
          })
        ).subscribe();
    });
  };
}