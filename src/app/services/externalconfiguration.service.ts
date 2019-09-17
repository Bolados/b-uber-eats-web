import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExternalConfiguration, ExternalConfigurationHandlerInterface} from '@lagoshny/ngx-hal-client';
import {API_URL} from '../_config/api.configuration';


@Injectable()
export class ExternalConfigurationService implements ExternalConfigurationHandlerInterface {

    deserialize() {
        throw new Error('Method not implemented.');
    }
    serialize() {
        throw new Error('Method not implemented.');
    }

    getProxyUri(): string {
      return null;
    }

    getRootUri(): string {
      return API_URL;
    }

    getHttp(): HttpClient {
      return this.http;
    }

    constructor(private http: HttpClient) {
    }

    getExternalConfiguration(): ExternalConfiguration {
      return null;
    }

    setExternalConfiguration(externalConfiguration: ExternalConfiguration) {
    }
  }
