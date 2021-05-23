import { Pipe, PipeTransform } from '@angular/core';
import { Provider } from '../provider.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: Provider[], searchText: string): any[] {
      if(!items) return [];
      if(!searchText) return items;
  searchText = searchText.toLowerCase();
  return items.filter( it => {
        return it.type.toLowerCase().includes(searchText);
      });
     }

}
