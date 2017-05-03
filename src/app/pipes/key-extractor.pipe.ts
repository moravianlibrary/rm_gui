import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyExtractor',
  pure: true
})
export class KeyExtractorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const keys: any[] = [];
    for (const key in value) {
      keys.push({k: key, v: value[key]});
    }
    return keys;
  }

}
