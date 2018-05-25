import { Component, AfterViewInit, ViewChild, ElementRef, PLATFORM_ID, Inject, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Config } from '../../../environments/environment';

declare var jQuery: any;

@Component({
    selector: 'slider',
    templateUrl: './slider.element.html',
    styleUrls: ['./slider.element.css']
})
export class SliderElement {
    config: any = Config;
    loading: boolean = true;
    
    @ViewChild('owl') owl: ElementRef;

    @Input()
    data: any[] = [];

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    exec() {        
        setTimeout(() => {
            if (isPlatformBrowser(this.platformId)) {
                let owlElm: any = jQuery(this.owl.nativeElement);
                var dragging = true;
        
                var fadeInReset = function() {
                    if (!dragging) {
                        owlElm.find(".caption .fadeIn-1,.caption .fadeIn-2,.caption .fadeIn-3").stop().delay(800).animate({ opacity: 0 }, { duration: 400, easing: "easeInCubic" });
                    } else {
                        owlElm.find(".caption .fadeIn-1,.caption .fadeIn-2,.caption .fadeIn-3").css({ opacity: 0 });
                    }
                }
        
                var fadeInDownReset = function() {
                    if (!dragging) {
                        owlElm.find(".caption .fadeInDown-1,.caption .fadeInDown-2,.caption .fadeInDown-3").stop().delay(800).animate({ opacity: 0, top: "-15px" }, { duration: 400, easing: "easeInCubic" });
                    } else {
                        owlElm.find(".caption .fadeInDown-1,.caption .fadeInDown-2,.caption .fadeInDown-3").css({ opacity: 0, top: "-15px" });
                    }
                }
        
                var fadeInUpReset = function() {
                    if (!dragging) {
                        owlElm.find(".caption .fadeInUp-1,.caption .fadeInUp-2,.caption .fadeInUp-3").stop().delay(800).animate({ opacity: 0, top: "15px" }, { duration: 400, easing: "easeInCubic" });
                    } else {
                        owlElm.find(".caption .fadeInUp-1,.caption .fadeInUp-2,.caption .fadeInUp-3").css({ opacity: 0, top: "15px" });
                    }
                }
        
                var fadeInLeftReset = function() {
                    if (!dragging) {
                        owlElm.find(".caption .fadeInLeft-1,.caption .fadeInLeft-2,.caption .fadeInLeft-3").stop().delay(800).animate({ opacity: 0, left: "15px" }, { duration: 400, easing: "easeInCubic" });
                    } else {
                        owlElm.find(".caption .fadeInLeft-1,.caption .fadeInLeft-2,.caption .fadeInLeft-3").css({ opacity: 0, left: "15px" });
                    }
                }
        
                var fadeInRightReset = function() {
                    if (!dragging) {
                        owlElm.find(".caption .fadeInRight-1,.caption .fadeInRight-2,.caption .fadeInRight-3").stop().delay(800).animate({ opacity: 0, left: "-15px" }, { duration: 400, easing: "easeInCubic" });
                    } else {
                        owlElm.find(".caption .fadeInRight-1,.caption .fadeInRight-2,.caption .fadeInRight-3").css({ opacity: 0, left: "-15px" });
                    }
                }
        
                var fadeIn = function() {
                    owlElm.find(".active .caption .fadeIn-1").stop().delay(500).animate({ opacity: 1 }, { duration: 800, easing: "easeOutCubic" });
                    owlElm.find(".active .caption .fadeIn-2").stop().delay(700).animate({ opacity: 1 }, { duration: 800, easing: "easeOutCubic" });
                    owlElm.find(".active .caption .fadeIn-3").stop().delay(1000).animate({ opacity: 1 }, { duration: 800, easing: "easeOutCubic" });
                }
        
                var fadeInDown = function() {
                    owlElm.find(".active .caption .fadeInDown-1").stop().delay(500).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
                    owlElm.find(".active .caption .fadeInDown-2").stop().delay(700).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
                    owlElm.find(".active .caption .fadeInDown-3").stop().delay(1000).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
                }
        
                var fadeInUp = function() {
                    owlElm.find(".active .caption .fadeInUp-1").stop().delay(500).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
                    owlElm.find(".active .caption .fadeInUp-2").stop().delay(700).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
                    owlElm.find(".active .caption .fadeInUp-3").stop().delay(1000).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
                }
        
                var fadeInLeft = function() {
                    owlElm.find(".active .caption .fadeInLeft-1").stop().delay(500).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
                    owlElm.find(".active .caption .fadeInLeft-2").stop().delay(700).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
                    owlElm.find(".active .caption .fadeInLeft-3").stop().delay(1000).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
                }
        
                var fadeInRight = function() {
                    owlElm.find(".active .caption .fadeInRight-1").stop().delay(500).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
                    owlElm.find(".active .caption .fadeInRight-2").stop().delay(700).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
                    owlElm.find(".active .caption .fadeInRight-3").stop().delay(1000).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
                }
        
                owlElm.owlCarousel({    
                    autoPlay: 5000,
                    stopOnHover: true,
                    navigation: true,
                    pagination: true,
                    singleItem: true,
                    addClassActive: true,
                    transitionStyle: "fade",
                    navigationText: ["<i class=\"material-icons\">navigate_before</i>", "<i class=\"material-icons\">navigate_next</i>"],
        
                    afterInit: function() {
                        fadeIn();
                        fadeInDown();
                        fadeInUp();
                        fadeInLeft();
                        fadeInRight();
                    },
        
                    afterMove: function() {
                        fadeIn();
                        fadeInDown();
                        fadeInUp();
                        fadeInLeft();
                        fadeInRight();
                    },
        
                    afterUpdate: function() {
                        fadeIn();
                        fadeInDown();
                        fadeInUp();
                        fadeInLeft();
                        fadeInRight();
                    },
        
                    startDragging: function() {
                        dragging = true;
                    },
        
                    afterAction: function() {
                        fadeInReset();
                        fadeInDownReset();
                        fadeInUpReset();
                        fadeInLeftReset();
                        fadeInRightReset();
                        dragging = false;
                    }    
                });

                this.loading = false;
            }
        }, 0);
    }
}
