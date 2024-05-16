import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { distinctUntilChanged, fromEvent, map } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MXGridColumn } from './models/mx-grid.model';


/**
 * Represents a grid component that leverages virtual scrolling.
 * This component provides a performant way to display large sets of data in a tabular format.
 * @en {"summary": "Component to display a table"}
 * @end
 */
@Component({
  selector: 'mx-grid',
  templateUrl: './mx-grid.component.html',
  styleUrls: ['./mx-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@UntilDestroy()

export class MxGridComponent implements AfterViewInit {

  /**
   * References the header element to synchronize the scroll position with the body.
   */
  @ViewChild('header') private header!: ElementRef<HTMLDivElement>;

  /**
   * References the viewport of the CDK virtual scroll for managing scrolling operations.
   */
  @ViewChild('viewport') private viewport!: CdkVirtualScrollViewport;

  /**
   * The dataset to be rendered in the grid.
   * @remark Assumes that each item in the array corresponds to one row in the grid.
   */
  @Input() data: any[] = [];

   /**
   * Configuration for columns of the grid, including width and the data field to be displayed.
   * @en {"summary": "Configuration for columns of the grid, including width and the data field to be displayed", "type": "MXGridColumn[]"}
   * @end
   */
  @Input() columns: MXGridColumn[] = [];

  /**
   * Height of each row in the grid.
   * @remark Default value is 22 pixels.
   * @default 22
   */
  @Input() rowHeight: number = 22;


  isLoading: boolean = false;

  constructor() { }


  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.setupScrollSynchronization();
  }

  /**
   * Sets up synchronization of horizontal scroll positions between the header and the viewport.
   */
  private setupScrollSynchronization(): void {
    fromEvent(this.viewport.elementRef.nativeElement, 'scroll').pipe(
      map(event => (event.target as Element).scrollLeft),
      distinctUntilChanged(),
      untilDestroyed(this)
    ).subscribe(scrollLeft => {
      // this.header.nativeElement.scrollLeft = scrollLeft;
    });
  }
}
