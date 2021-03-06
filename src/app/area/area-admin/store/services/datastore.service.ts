import {Injectable, Injector} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Resource, RestService} from '@lagoshny/ngx-hal-client';

export interface IDataStoreFindParam {
    key: string;
    value: any;
}

function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

@Injectable()
export class DatastoreService<T extends Resource> extends RestService<T> {

    public data: BehaviorSubject<Array<T>> = new BehaviorSubject<Array<T>>(new Array<T>());

    private adapter: (item: any) => T = null;

    setAdapter(adapter: (item: any) => T): DatastoreService<T> {
        this.adapter = adapter;
        return this;
    }

    initData(): void {
        this.getAll().subscribe(
            (data: T[]) => {
                console.log('init data', data);
                if (this.adapter) {
                    data.forEach((v, i) => {
                        data[i] = this.adapter(v);
                    });
                }
                this.data.next(data);
            },
            (error: HttpErrorResponse) => {
                console.log (error.name + ' ' + error.message);
            }
        );
    }

    constructor(
        type: new ()  => T,
        resource: string,
        injector: Injector
    ) {
        super(type, resource, injector);
    }

    public find(param: IDataStoreFindParam): Observable<T> {
        const params = [param];
        const options: any = {params};
        const method = 'findBy' + capitalize(param.key);
        console.log(method, params, options);
        return this.searchSingle(method, options);
    }

}
