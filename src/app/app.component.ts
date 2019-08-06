import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ubereats back office';

    constructor(public translate: TranslateService) {
        const Languages = ['en', 'fr'];
        const LanguagesReg = /en|fr/;
        this.translate.addLangs(Languages);
        let index = 0;
        // const browserLang = translate.getBrowserLang();
        // if (browserLang.match(LanguagesReg)) {
        //     index = Languages.indexOf(browserLang);
        // }
        this.translate.setDefaultLang(Languages[index]);
        this.translate.use(Languages[index]);
    }
}
