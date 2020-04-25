export class User {
    constructor(
        public id: number,
        public username: string,
        public password: string,
        public email: string,
        public name: string,
        public lastname: string,
        public phone: string,
        public address: string
    ) { }
}