import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import environment from "../constants/environment";

@Injectable()
export class AuthService {

    API_URL = null;
    PUERTO = '5000';

    constructor(
        private httpClient: HttpClient
    ) {
        this.refreshIp()
    }

    /**
     * Siempre refresco la ip antes de una consulta, por si las dudas cambió
     */
    refreshIp = () => {
        // Actualizo también la ip servidora
        const serviceIPStorage = localStorage.getItem('serviceIP')

        this.API_URL = serviceIPStorage ? 
            `http://${serviceIPStorage}:${this.PUERTO}/` : 
            `http://${environment.defaultIp}:${this.PUERTO}/`
    }

    mouseMove = (deltaX, deltaY) => {
        this.refreshIp();

        return this.httpClient.get(
            `${this.API_URL}mouse/move/${deltaX}/${deltaY}`
        )
    }

    mouseClick = (type) =>  {
        this.refreshIp();

        return this.httpClient.get(
            `${this.API_URL}mouse/click/${type}`
        )
    }

    mouseScroll = (deltaX, deltaY) => {
        this.refreshIp();

        return this.httpClient.get(
            `${this.API_URL}mouse/scroll/${deltaX}/${deltaY}`
        )
    }


}
