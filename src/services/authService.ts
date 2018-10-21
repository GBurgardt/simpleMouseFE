import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {

    API_URL = 'http://192.168.0.11:5000/';

    constructor(
        private httpClient: HttpClient
    ) { }

    mouseMove = (deltaX, deltaY) =>
        this.httpClient.get(
            `${this.API_URL}mouse/move/${deltaX}/${deltaY}`
        )

    mouseClick = (type) => 
        this.httpClient.get(
            `${this.API_URL}mouse/click/${type}`
        )

    mouseScroll = (deltaX, deltaY) =>
        this.httpClient.get(
            `${this.API_URL}mouse/scroll/${deltaX}/${deltaY}`
        )


}
