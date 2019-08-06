import { MatPaginatorIntl } from '@angular/material';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';



export class PaginatorI18n extends MatPaginatorIntl {

  constructor(private translate: TranslateService) {
    super();
    this.setLabels();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setLabels();
      this.changes.next();
    });
  }

  tr(tag: string, inter?: any ): string {
      const root = 'GLOBAL_CONFIGURATION.PAGINATION.';
      return this.translate.instant(root + tag, inter);
  }


  setLabels() {
      this.itemsPerPageLabel = this.tr('ITEMS_PER_PAGE_LABEL');
      this.nextPageLabel = this.tr('NEXT_PAGE_LABEL');
      this.previousPageLabel = this.tr('PREVIOUS_PAGE_LABEL');
      this.firstPageLabel = this.tr('FIRST_PAGE_LABEL');
      this.lastPageLabel = this.tr('LAST_PAGE_LABEL');
      this.getRangeLabel = this.rangeLabel.bind(this);
  }

  private rangeLabel(page: number, pageSize: number, length: number): string {
      if (length === 0 || pageSize === 0) {
          return this.tr('RANGE_PAGE_LABEL_1', { length });
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return this.translate.instant('PAGINATION.RANGE_PAGE_LABEL_2', { startIndex: startIndex + 1, endIndex, length });
  }
}
