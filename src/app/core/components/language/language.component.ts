import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

    selectedLanguage: string = this.translate.currentLang;

    translateTo() {
        this.translate.use(this.selectedLanguage);
    }


    constructor(public translate: TranslateService) {
    }

    ngOnInit(): void {
    }

}
