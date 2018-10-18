import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/authService';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    // Tipo de mouse. 'mousePointer' o 'arrows'
    mouseType = 'mousePointer';

    mouseDownID = -1;

    constructor(
        public navCtrl: NavController,
        private authService: AuthService
    ) { }

    /**
     * Mueve el mouse
     */
    onMouseDown = (x, y) => {
        if(this.mouseDownID === -1) {
            this.mouseDownID = setInterval(
                () => {
                    this.authService.mouseMove(
                        x,
                        y
                    )
                        .subscribe(
                            resp => resp
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
                resp => resp
            )
    }



    // Voy guardando las coordenadas a medida que se dispara el evento touchmove
    oldCordTouch =  {
        x: -1,
        y: -1
    }

    // Voy guardando el tiempo en segundos del touchmove actual
    timeCurrentInterval = 1;

    // Para eso uso un intervalo, del cual guardo su id para posteriormente limpiarlo (cuando saque el dedo)
    timeIntervalID = -1;

    // Velocidad del puntero
    velocidadPuntero = 2;

    // Si está en movimiento o no..
    itIsMoving = false;

    /**
     * Mueve el mouse y va actualizando las oldcordtouch
     * console.log(ev.targetTouches[0].force);
     */
    onTouchMove = (ev) => {
        // Actualizo el estado del touch
        this.itIsMoving = true;

        const xTouch = ev && ev.targetTouches && ev.targetTouches.length > 0 && ev.targetTouches[0] ?
            ev.targetTouches[0].clientX : -1;
        const yTouch = ev && ev.targetTouches && ev.targetTouches.length > 0 && ev.targetTouches[0] ?
            ev.targetTouches[0].clientY : -1;

        // Un poco de cinemática
        const t = this.timeCurrentInterval;
        const deltaX = (xTouch - this.oldCordTouch.x);
        const deltaY = (yTouch - this.oldCordTouch.y);

        const aX = (2*deltaX)/(t**2)
        const v0X = 0; // Después probar calcular alguna velocidad inicial en función de la fuerza ejercida en el touch
        const vX = v0X + aX*t;
        const deltaDesktopX = ((vX + v0X) / 2) * t;

        const aY = (2*deltaY)/(t**2)
        const v0Y = 0; // Después probar calcular alguna velocidad inicial en función de la fuerza ejercida en el touch
        const vY = v0Y + aY*t
        const deltaDesktopY = ((vY + v0Y) / 2) * t

        this.authService.mouseMove(
            deltaDesktopX * this.velocidadPuntero,
            deltaDesktopY * this.velocidadPuntero
        )
            .subscribe(
                resp => resp
            )

        // Actualizo coordenadas persistidas
        this.oldCordTouch = {
            x: xTouch,
            y: yTouch
        }
            
    }

    /**
     * Inicializa las oldcordtouch
     */
    onTouchStart = (ev) => {
        const xTouch = ev && ev.targetTouches && ev.targetTouches.length > 0 && ev.targetTouches[0] ?
            ev.targetTouches[0].clientX : -1;
        const yTouch = ev && ev.targetTouches && ev.targetTouches.length > 0 && ev.targetTouches[0] ?
            ev.targetTouches[0].clientY : -1;

        this.oldCordTouch = {
            x: xTouch,
            y: yTouch
        }

        // Cada 10 milisegundos voy sumando 10 milisegundos al tiempo del intervalo actual
        this.timeIntervalID = setInterval(() => {
            // Constante intervalo movimiento
            const deltaInterval = 0.010;
            // Tengo que evitar que sea 0
            this.timeCurrentInterval = this.timeCurrentInterval + deltaInterval;

            // const ciclos = (this.timeCurrentInterval - 1) / deltaInterval
            // console.log(ciclos);
        }, 10)
    }

    /**
     * Reinicializa las oldcordtouch
     */
    onTouchEnd = (ev) => {
        // console.log(ev.timeStamp)
        // Reseteo coordenadas persistidas
        this.oldCordTouch = {
            x: -1,
            y: -10
        }

        // Si NO se está moviendo, hace click izquierdo
        if (
            !this.itIsMoving
        ) {
            const typeClick = 'left';
            this.onMouseClick(typeClick);
        }
        
        // Limpio el id del intervalo actual y el tiempo actual del intervalo
        if(this.timeIntervalID !== -1) {
            clearInterval(this.timeIntervalID);
            this.timeIntervalID = -1;
            this.timeCurrentInterval = 1;
        }

        // No se está moviendo más..
        this.itIsMoving = false;


    }
    
}