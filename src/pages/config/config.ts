import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import environment from '../../constants/environment';

@Component({
    selector: 'page-config',
    templateUrl: 'config.html'
})
export class ConfigPage {
    ipAlmacenada = '';
    inputServiceIp = null;

    constructor(
        private navCtrl: NavController
    ) {
        this.ipAlmacenada = localStorage.getItem('serviceIP') ? 
            localStorage.getItem('serviceIP') : 
            environment.defaultIp;
    }

    goHome = () => {
        if (this.navCtrl.canGoBack()) {
            this.navCtrl.pop()
        } else {
            // this.navCtrl.push(HomePage)
        }
    }

    saveIp = () => {
        localStorage.setItem(
            'serviceIP',
            this.inputServiceIp
        );

        this.goHome();
    }
    
}