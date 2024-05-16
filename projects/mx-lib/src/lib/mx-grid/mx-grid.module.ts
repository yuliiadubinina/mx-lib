import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MxGridComponent } from './mx-grid.component';
import { ScrollingModule } from '@angular/cdk/scrolling';


/**
 * Represents a grid component that leverages virtual scrolling.
 * This component provides a performant way to display large sets of data in a tabular format.
 * @en {"summary": "Component to display a table"}
 * @usage <mx-grid
 *   [data]="data"
 *   [columns]="columns">
 * </mx-grid>
 * @reference import {MxGridModule} from '@mx/core';
 * @end
 *
 */
@NgModule({
  declarations: [
    MxGridComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
  ],
  exports: [
    MxGridComponent
  ]
})
export class MxGridModule { }
