import {RoleName} from '../authentication/models';

export function dataRouteMapper(route: any, application: string) {
    const data: any = route.data;
    if (data) {
        data.application = application;
        data.roles = route.data.roles as Array<RoleName> || [];
    }
    route.data = data;
    return route;
}
