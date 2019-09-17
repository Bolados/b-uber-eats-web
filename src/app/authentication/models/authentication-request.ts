export class AuthenticationRequest {

    constructor(
        public username: string,
        public password: string,
        public application: string,
        public role: string,
    ) {
    }
}
