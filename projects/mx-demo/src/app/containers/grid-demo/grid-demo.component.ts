import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { DocApiService } from '../../services/doc-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiDocModel } from '../../components/api-doc/api-doc.model';
import * as Prism from 'prismjs';
import { MXGridColumn, MxGridComponent } from 'projects/mx-lib/src/public-api';

@Component({
  selector: 'app-grid-demo',
  templateUrl: './grid-demo.component.html',
  styleUrls: ['./grid-demo.component.scss']
})
export class GridDemoComponent implements OnInit, OnDestroy, AfterViewInit {

  model: ApiDocModel = new ApiDocModel();
  tabSelectedIndex: number = 0;
  fragmentSubscription: any;

  preElevation = 'mat-elevation-z1';
  // highlighted: boolean = false;

  EXAMPLE_FRAGMENT = 'example';

  dataModel: any;


  columns: MXGridColumn[] = [
    { field: 'id', name: 'ID', width: 30 },
    { field: 'firstName', name: 'First Name', width: 150 },
    { field: 'lastName', name: 'Last Name', width: 75},
    { field: 'phoneNumber', name: 'Phone Number', width: 100 },
  ];

  data: any[] = [
    { id: '1', firstName: 'Lynette 1', lastName: 'Scavo', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-22', date: '2017-07T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '3', firstName: 'Gabrielle', lastName: 'Solis', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-24', date: '2017-08T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '4', firstName: 'Susan', lastName: 'Mayer', status: 'Single', icon: 'person', phoneNumber: '+1(28)-123-11-25', date: '2017-08T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '5', firstName: 'Edie', lastName: 'Britt', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-26', date: '2017-08T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '6', firstName: 'Lynette 78', lastName: 'Scavo', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-22', date: '2017-09T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '7', firstName: 'Bree Van', lastName: 'de Kamp', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-23', date: '1876-12-31T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '8', firstName: 'Gabrielle', lastName: 'Solis', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-24', date: '2017-09T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '9', firstName: 'Susan', lastName: 'Mayer', status: 'Single', icon: 'person', phoneNumber: '+1(28)-123-11-25', date: '2017-09T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '10', firstName: 'Edie', lastName: 'Britt', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-26', date: '2017-09T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '11', firstName: 'Lynette 234', lastName: 'Scavo', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-22', date: '2017-10T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '12', firstName: 'Bree Van', lastName: 'de Kamp', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-23', date: '2017-10T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '13', firstName: 'Gabrielle', lastName: 'Solis', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-24', date: '1876-12-31T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '14', firstName: 'Susan', lastName: 'Mayer', status: 'Single', icon: 'person', phoneNumber: '+1(28)-123-11-25', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '15', firstName: 'Edie', lastName: 'Britt', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-26', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '16', firstName: 'Lynette 67', lastName: 'Scavo', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-22', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '17', firstName: 'Bree Van', lastName: 'de Kamp', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-23', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '18', firstName: 'Gabrielle', lastName: 'Solis', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-24', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '19', firstName: 'Susan', lastName: 'Mayer', status: 'Single', icon: 'person', phoneNumber: '+1(28)-123-11-25', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '20', firstName: 'Edie', lastName: 'Britt', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-26', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '21', firstName: 'Lynette 45', lastName: 'Scavo', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-22', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '22', firstName: 'Bree Van', lastName: 'de Kamp', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-23', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '23', firstName: 'Gabrielle', lastName: 'Solis', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-24', date: '2017-06T14:19:00', count: 6 },
    { id: '24', firstName: 'Susan', lastName: 'Mayer', status: 'Single', icon: 'person', phoneNumber: '+1(28)-123-11-25', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '25', firstName: 'Edie', lastName: 'Britt', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-26', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '26', firstName: 'Lynette 645', lastName: 'Scavo', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-22', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '27', firstName: 'Bree Van', lastName: 'de Kamp', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-23', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '28', firstName: 'Gabrielle', lastName: 'Solis', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-24', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '29', firstName: 'Susan', lastName: 'Mayer', status: 'Single', icon: 'person', phoneNumber: '+1(28)-123-11-25', date: '2017-03T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '30', firstName: 'Edie', lastName: 'Britt', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-26', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '31', firstName: 'Lynette 546', lastName: 'Scavo', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-22', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '32', firstName: 'Bree Van', lastName: 'de Kamp', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-23', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '33', firstName: 'Gabrielle', lastName: 'Solis', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-24', date: '2017-12T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '34', firstName: 'Susan', lastName: 'Mayer', status: 'Single', icon: 'person', phoneNumber: '+1(28)-123-11-25', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '35', firstName: 'Edie', lastName: 'Britt', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-26', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '36', firstName: 'Lynette234', lastName: 'Scavo', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-22', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '37', firstName: 'Bree Van', lastName: 'de Kamp', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-23', date: '2017-12T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '38', firstName: 'Gabrielle', lastName: 'Solis', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-24', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '39', firstName: 'Susan', lastName: 'Mayer', status: 'Single', icon: 'person', phoneNumber: '+1(28)-123-11-25', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '40', firstName: 'Edie', lastName: 'Britt', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-26', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '32', firstName: 'Bree Van', lastName: 'de Kamp', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-23', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '33', firstName: 'Gabrielle', lastName: 'Solis', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-24', date: '2017-12T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '34', firstName: 'Susan', lastName: 'Mayer', status: 'Single', icon: 'person', phoneNumber: '+1(28)-123-11-25', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '35', firstName: 'Edie', lastName: 'Britt', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-26', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '36', firstName: 'Lynette234', lastName: 'Scavo', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-22', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '37', firstName: 'Bree Van', lastName: 'de Kamp', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-23', date: '2017-12T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '38', firstName: 'Gabrielle', lastName: 'Solis', status: 'Married', icon: 'group', phoneNumber: '+1(28)-123-11-24', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" },
    { id: '39', firstName: 'Susan', lastName: 'Mayer', status: 'Single', icon: 'person', phoneNumber: '+1(28)-123-11-25', date: '2017-06T14:19:00', count: 6, time: "1900-01-01T14:19:00" }
];


  searchText: string = '';
  searchShow = false;
  groupingExpression = [];

  showGrouping: boolean = true;

  sortingExpression = [
  ]

  constructor(
    private docApiService: DocApiService,
    private route: ActivatedRoute,
    private r: Router
  ) {
  }

  ngOnInit() {
    this.model = new ApiDocModel();
    this.loadDocs();
    this.fragmentSubscription = this.route.fragment.subscribe((anchor: any) => this.showTab(anchor));
  }

  ngAfterViewInit() {
    Prism.highlightAll();
  }

  ngOnDestroy() {
    this.fragmentSubscription.unsubscribe();
  }

  loadDocs() {
    this.docApiService.getDocs('MXGridModule').subscribe(r => {
      Object.assign(this.model, r);
      setTimeout(() => {
        Prism.highlightAll();
      }, 100);
    }, ex => {
      console.error(ex);
    });
  }

  private showTab(anchor: string) {
    if (anchor === 'example') {
      this.tabSelectedIndex = 1;
    } else {
      this.tabSelectedIndex = 0;
    }
  }

  onSelectedTabIndexChange(e: number) {
    if (e === 1) {
      this.r.navigate([], { fragment: this.EXAMPLE_FRAGMENT });
    } else {
      setTimeout(() => {
        Prism.highlightAll();
      }, 100);
      this.r.navigate([]);
    }
  }


}
