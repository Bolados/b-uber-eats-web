export class Role {
    public name: RoleName;

    // url formaat {app}/{role}/{login}
    static FromLoginUrl(url: string, loginPath: string) {
        const urlLoginArray = url.split('/' + loginPath);
        if (urlLoginArray.length === 2) {
            let urlLogin = urlLoginArray[0];
            if (urlLogin.startsWith('/')) {
                urlLogin = urlLogin.slice(1);
            }
            const appRole = urlLogin.split('/');
            if (appRole.length === 2) {
                console.log(appRole[1]);
                return {
                    name: RoleName[appRole[1].toLocaleUpperCase()]
                };
            }
        }
        return {
            name: RoleName.USER
        };
    }
}

export enum RoleName {
    USER = 'user',
    ADMIN = 'admin',
}
