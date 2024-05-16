import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  appName: string = 'MX Admin UI Kit';

  componentsList: any[] = [
    { title: 'Grid', icon: 'grid', route: '/grid' },
  ]
}


