import { Pipe, PipeTransform } from '@angular/core';
import {OaiHarvestJobStatistics} from '../model/oai-harvest-job-statistics';

@Pipe({
  name: 'afterDateFilter'
})
export class AfterDateFilterPipe implements PipeTransform {

  transform(statistics: OaiHarvestJobStatistics[], after: Date): OaiHarvestJobStatistics[] {
    const filteredStatistics: OaiHarvestJobStatistics[] = [];


    if (statistics != null) {
      statistics.forEach(item => {

        if (after != null && !isNaN(after.getTime())) {

          const startedDate = new Date(item.startTime);


          if (item.startTime != null && !isNaN(startedDate.getTime()) && after <= startedDate) {
            filteredStatistics.push(item);
          }
        }else {
          filteredStatistics.push(item);
        }
      });
    }

    return filteredStatistics;
  }

}
