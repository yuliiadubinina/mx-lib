import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiDocModel, ApiDocBlock, ApiDocBlockDetails, ApiDocTable } from '../components/api-doc/api-doc.model';


import data from 'docs/doc-api.json';


@Injectable()
export class DocApiService {

  private _lang: string = 'en';

  constructor(/*private translationService: AppTranslationService*/) {
    // this.translationService.languageChangedEvent().subscribe(data => { this.dateAdapter.setLocale(this.translationService.currentLanguage); });
  }

  getDocs(moduleName: string): Observable</*ApiDocModel*/ any> {
    return of(data).pipe(
      map(n => {

       const model = this.buildModel(n.children, moduleName);
       return model;
      }),
      // catchError((error: any) => {
      //   console.error(error);
      //   return null;
      // })
    );
  }


  private buildBlock(data: any[], blockName: string): ApiDocBlock {

    const block = this.strongFilter(data, 'name', blockName);
    if (block) {
      // todo(abevkh): change to regex


      console.log(block.decorators);
      const t = block.decorators[0].arguments.obj?.split('{').join('').split('}').join('').split('\n').join('').split('\r').join('').split(' ').join('').split(',');

      const apiDocBlockDetails = new ApiDocBlockDetails();
      apiDocBlockDetails.selector = this.arrayValue(t, 'selector');
      apiDocBlockDetails.exportAs = this.arrayValue(t, 'exportAs');
      apiDocBlockDetails.codeBlock = '';
      apiDocBlockDetails.name = blockName;
      // tslint:disable-next-line: no-non-null-assertion
      apiDocBlockDetails.description = this.getFromComment(block!.comment || null, 'summary');

      if (block != null && block.comment != null && block.comment.tags) {
        const tag = block.comment.tags.find((f: any) => f.tag === 'styles');
        if (tag != null && tag.text != null && tag.text.length > 0) {
          apiDocBlockDetails.styles = tag.text.split('{').join('').split('}').join('').split('\n').join('').split('\r').join('').split(' ').join('').split(',');
        } else {
          apiDocBlockDetails.styles = [];
        }
        // apiDocBlockDetails.styles = block!.comment ||;
      }

      if (!!block.children) {
        const properties = block.children.filter((f: any) => (f.kindString === 'Property' || f.kindString === 'Accessor') && f.comment != null);
        for (const prop of properties) {
          // debugger;
          if (prop && prop.decorators && Array.isArray(prop.decorators) && prop.decorators.length > 0) {

            const tmp = new ApiDocTable('@' + prop.decorators[0].type.name + '(' + (prop.decorators[0].arguments.bindingPropertyName || '') + ')\n' +
              prop.name + ': ' +
              this.propType(prop),
              // prop.comment.shortText
              // tslint:disable-next-line: no-non-null-assertion
              this.getFromComment(prop!.comment || null, 'summary'),
              // tslint:disable-next-line: no-non-null-assertion
              this.getFromComment(prop!.comment || null, 'remark')
            );

            if (tmp && tmp.description && tmp.description.length > 0) {
              apiDocBlockDetails.properties.push(tmp);
            }
          }

        }
      }

      apiDocBlockDetails.properties = [...apiDocBlockDetails.properties.sort((x, y) => x.name.startsWith('@Input') ? -1 : 1)];

      // tslint:disable-next-line: no-non-null-assertion
      if (!!block.children) {
        const methods = block.children.filter((f: any) => f.kindString === 'Method' && f.signatures![0].comment != null);
        for (const method of methods) {

          const tmp = new ApiDocTable(
            // tslint:disable-next-line: no-non-null-assertion
            method.name + '(' + this.buildArgs(method!.signatures![0].parameters || null) + ')',
            // comment
            // tslint:disable-next-line: no-non-null-assertion
            this.getFromComment(method.signatures![0].comment || null, 'summary'),
            // tslint:disable-next-line: no-non-null-assertion
            this.getFromComment(method.signatures![0].comment || null, 'remark')
          );

          if (tmp && tmp.description && tmp.description.length > 0) {
            apiDocBlockDetails.methods.push(tmp);
          }
        }
      }



      const apiDocBlock = new ApiDocBlock();
      apiDocBlock.details.push(apiDocBlockDetails);
      return apiDocBlock;
    } else {
      return new ApiDocBlock();
    }

  }

  private buildModel(data: any[], moduleName: string): ApiDocModel {



    console.log(data);
    const result = new ApiDocModel();
    // let block = this.filter(data, 'name', moduleName);
    const block = this.strongFilter(data, 'name', moduleName);

    result.description = this.getFromComment((block && block.comment) ? block.comment : null, 'summary');

    // tslint:disable-next-line: no-non-null-assertion
    result.usageCode = (block && block.comment && block.comment.tags && block.comment.tags instanceof Array) ? block.comment.tags.filter((f: any) => f.tag.toLowerCase() === 'usage')![0].text || null : null;
    result.usageCode = (result.usageCode) ? result.usageCode.split('\\@').join('@') : null;

    result.usageCodeJS = (block && block.comment && block.comment.tags && block.comment.tags instanceof Array) ? (block.comment.tags.find((f: any) => f.tag.toLowerCase() === 'usagejs') || {}).text || null : null;
    result.usageCodeJS = (result.usageCodeJS) ? result.usageCodeJS.split('\\@').join('@') : null;

    // tslint:disable-next-line: no-non-null-assertion
    result.referenceCode = (block && block.comment && block.comment.tags && block.comment.tags instanceof Array) ? block.comment.tags.filter((f: any) => f.tag.toLowerCase() === 'reference')![0].text || null : null;
    result.referenceCode = (result.referenceCode) ? result.referenceCode.split('\\@').join('@') : null;
    // result.usageCode = this.getFromComment(block.comment, 'usage');
    // result.referenceCode = this.getFromComment(block.comment, 'reference');

    // debugger;
    // getting dependencies (declarations/exports)
    const dependenciesString = (block && block.decorators && block.decorators.length > 0 && block.decorators[0].arguments && block.decorators[0].arguments.obj) ? block.decorators[0].arguments.obj : null;

    if (dependenciesString == null) {
      return result;
    }

    // todo(abevkh): change to regex
    const dependencies = dependenciesString.substring(dependenciesString.indexOf('exports:')).split('exports:').join('').split('\n').join('').split(' ').join('').split('{').join('').split('}').join('').split('[').join('').split(']').join('').split(',');
    for (const dependency of dependencies) {
      if (dependency != null && dependency !== '') {
        const b = this.buildBlock(data, dependency);
        b.blockType = 'directives';
        result.blocks.push(b);
      }
    }
    return result;
  }

  private getFromComment(comment: any, field: string) {
    if (comment && comment.tags && comment.tags instanceof Array) {
      try {
        // tslint:disable-next-line: no-non-null-assertion
        const s: string = comment!.tags.filter((f: any) => f.tag === this._lang)![0].text;
        const j = JSON.parse(s);
        return j[field];
      } catch { }
    }
    // tslint:disable-next-line: no-non-null-assertion
    if (field === 'text') { return comment!.shortText || null; }
    return null;
  }

  private buildArgs(args: any[]): string {
    if (args == null || args === undefined || args.length <= 0) { return ''; }
    let result = '';
    let needComma = false;
    for (const item of args) {
      result += (needComma ? ', ' : '') + item.name + ': ' + this.propType(item);
      needComma = true;
    }

    return result;
  }

  private propType(t: any): string {

    if (t == null || t === undefined) { return ''; }

    if (t.kindString === 'Accessor') {

      if (t.getSignature == null || t.getSignature.length <= 0) { return ''; }

      // debugger;
      let typeString = '';
      if (t.getSignature[0].type.type === 'union') {
        let firstItem = true;
        for (const type of t.getSignature[0].type.types) {
          typeString = typeString + (firstItem === true ? '' : ' | ') + (type.type === 'stringLiteral' ? `'${type.value}'` : type.name);
          firstItem = false;
        }
        return typeString;
      } else {
        return t.getSignature[0].type.name;
      }

      // debugger;

      return 'Accessor';
    }

    if (t.type == null || t.type === undefined) { return ''; }

    // debugger;
    switch (t.type.type) {
      case 'reference':
        return t.type.name + '<' + ((t.type && this.ArrayHasElements(t.type.typeArguments)) ? t.type.typeArguments[0].name : '?') + '>';
        break;
      case 'intrinsic':
        return t.type.name;
        break;
      case 'array':
        return t.type.elementType.name + '[]';
        break;
      default: return '';
    }

    return '';
  }

  private ArrayHasElements(arr: any) {
    return arr && Array.isArray(arr) && arr.length > 0;
  }

  private arrayValue(array: string[], key: string): any {
    console.log(array);
    for (const item of array) {
      if (item.startsWith(key)) {
        return item.replace(key, '').split('\'').join('').split(':').join('');
      }
    }
  }

  private strongFilter(data: any[], field: string, searchString: string): any {
    for (const item of data) {
      if (item[field].split('\n').join('').split('\r').join('').toLowerCase() === searchString.split('\n').join('').split('\r').join('').toLowerCase()) {
        return item;
      }
      if (item.children !== undefined && item.children.length > 0) {
        const childsearch = this.strongFilter(item.children, field, searchString);
        if (childsearch !== undefined) {
          return childsearch;
        }
      }
    }
    return undefined;
  }

}
