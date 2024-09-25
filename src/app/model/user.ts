import { Password } from "primeng/password";

export interface User {
    id: number;
    username: string;
    password:Password;
    phone:number;
    email: string;
    isAdmin: boolean;
    name:{
        firstname:string,
        lastname:string
    },
    address:{
        city:string,
        street:string,
        number:number
        zipcode:string,
        geolocation:{
            lat:string,
            long:string
        }
    },
}
