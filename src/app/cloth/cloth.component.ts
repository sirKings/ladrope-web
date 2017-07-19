import { Component, OnInit } from '@angular/core';
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';
import { AuthServiceService } from '../services/auth-service.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-cloth',
  templateUrl: './cloth.component.html',
  styleUrls: ['./cloth.component.css']
})
export class ClothComponent implements OnInit {

  cloth;
  imageSources: string[];
  config: ICarouselConfig;


  constructor(public router: Location, private service: AuthServiceService) { }

  ngOnInit() {
      this.cloth = this.service.selectedCloth;


      this.imageSources = [
         this.cloth.image1,
         this.cloth.image2,
         this.cloth.image3,
         this.cloth.image4
      ];

     this.config = {
      verifyBeforeLoad: true,
      log: false,
      animation: true,
      animationType: AnimationConfig.SLIDE,
      autoplay: true,
      autoplayDelay: 3000,
      stopAutoplayMinWidth: 768
    };
  }

  back(){
    this.router.back();
  }

}
