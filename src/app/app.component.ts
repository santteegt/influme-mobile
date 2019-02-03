import { Component } from "@angular/core";
import { Carousel, IndicatorAnimation, CarouselItem } from 'nativescript-carousel';
import { registerElement } from 'nativescript-angular/element-registry';



registerElement('Carousel', () => Carousel);
registerElement('CarouselItem', () => CarouselItem);

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {}
