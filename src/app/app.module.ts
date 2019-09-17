import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared';
import {CoreModule} from './core';
import {MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {MatPaginatorIntl} from '@angular/material';
import {PaginatorI18n} from './shared/utils/paginatorI18n.model';
import {HttpLoaderFactory, MyMissingTranslationHandler} from './shared/utils/i18n.helpers';
import {NgxHalClientModule} from '@lagoshny/ngx-hal-client';
import {ExternalConfigurationService} from './services/externalconfiguration.service';
import {HttpErrorInterceptor} from './errors/handle.error';
import {JwtInterceptor} from './authentication/interceptors/jwt-interceptor';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        // angular
        BrowserModule,
        // core & shared
        SharedModule,
        CoreModule,
        // app
        AppRoutingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler},
        }),

        NgxHalClientModule.forRoot(),
    ],
    providers: [
        {
            provide: MatPaginatorIntl, deps: [TranslateService],
            useClass: PaginatorI18n
        },
        {
            provide: 'ExternalConfigurationService',
            useClass: ExternalConfigurationService
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
