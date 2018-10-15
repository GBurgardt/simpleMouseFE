import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/authService';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    // Tipo de mouse. 'cursor' o 'arrows'
    mouseType = 'arrows';

    mouseDownID = -1;

    constructor(
        public navCtrl: NavController,
        private authService: AuthService
    ) { }

    /**
     * Mueve el mouse
     */
    onMouseDown = (direc) => {
        if(this.mouseDownID === -1) {
            this.mouseDownID = setInterval(
                () => {
                    this.authService.mouseMove(direc)
                        .subscribe(
                            resp => console.log(resp)
                        )
                }, 
                100
            );
        }
    }

    /**
     * Para el movimiento del mouse
     */
    onMouseUp = () => {
        if(this.mouseDownID!=-1) {
            clearInterval(this.mouseDownID);
            this.mouseDownID=-1;
        }
    }


    onMouseClick = (type) => {
        this.authService.mouseClick(type)
            .subscribe(
                resp => console.log(resp)
            )
    }

}
