import { Pipe, PipeTransform } from '@angular/core';
import { HiveUtils } from 'projects/hive/src/lib/types/utils';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {

  transform(mainArr: any[], searchText: string, property: string): any {
    return HiveUtils.filterArrayByString(mainArr, searchText);
  }
}
