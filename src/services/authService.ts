import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {

    constructor(
        private httpClient: HttpClient
    ) { }

    mouseMove = (deltaX, deltaY) =>
        this.httpClient.get(
            `http://192.168.0.51:3000/mouse/move/${deltaX}/${deltaY}`
            // `http://localhost:3000/mouse/move/${deltaX}/${deltaY}`
        )

    mouseClick = (type) => 
        this.httpClient.get(
            `http://192.168.0.51:3000/mouse/click/${type}`
        )


}