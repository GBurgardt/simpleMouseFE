import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {

    constructor(
        private httpClient: HttpClient
    ) { }

    mouseMove = (direc) =>
        this.httpClient.get(
            `http://192.168.0.51:3000/mouse/move/${direc}`
        )

    mouseClick = (type) => 
        this.httpClient.get(
            `http://192.168.0.51:3000/mouse/click/${type}`
        )


}