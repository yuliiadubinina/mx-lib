import { Component, OnInit, AfterViewInit, Input, ChangeDetectionStrategy } from '@angular/core';
import * as Prism from 'prismjs';
import { ApiDocModel } from './api-doc.model';

@Component({
  selector: 'app-api-doc',
  templateUrl: './api-doc.component.html',
  styleUrls: ['./api-doc.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiDocComponent implements OnInit, AfterViewInit {

  // private dataDiffer: KeyValueDiffer<string, any>;

  private _model: ApiDocModel = new ApiDocModel();
  @Input('model') set model(v: ApiDocModel) {

    for (const block of v.blocks) {
      switch (block.blockType) {
        case 'services': (block as any).order = 1; break;
        case 'directives': (block as any).order = 2; break;
        case 'classes': (block as any).order = 3; break;
        case 'interfaces': (block as any).order = 4; break;
        case 'functions': (block as any).order = 5; break;
        case 'type_aliases': (block as any).order = 6; break;
        case 'constants': (block as any).order = 7; break;
        default: (block as any).order = 999; break;
      }
    }

    this._model = v;
    this._model.blocks = v.blocks.sort((a, b) => ((a as any).order > (b as any).order ? 1 : -1));
  }

  get model(): ApiDocModel {
    return this._model;
  }

  preElevation = 'mat-elevation-z1';

  constructor(
    /*private differs: KeyValueDiffers,*/
  ) { }

  ngOnInit() {
    // this.dataDiffer = this.differs.find(this.model).create();
  }

  ngAfterViewInit() {
    // Prism.highlightAll();
  }

  update(model: ApiDocModel) {
    if (this._model == null || this._model === undefined) { this._model = new ApiDocModel(); }
    Object.assign(this._model, model);
    Prism.highlightAll();
  }

  blockType(idx: number): any {
    if (idx == null || idx === undefined || idx < 0) { return ''; }
    return this._model.blocks[idx].blockType;
  }



}
