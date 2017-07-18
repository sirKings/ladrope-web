import { Component, OnInit } from '@angular/core';
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';

@Component({
  selector: 'app-cloth',
  templateUrl: './cloth.component.html',
  styleUrls: ['./cloth.component.css']
})
export class ClothComponent implements OnInit {

  public imageSources: string[] = [
     'https://i1.wp.com/lh3.googleusercontent.com/-hoO9Asm2bwM/VvR3qF9MDzI/AAAAAAAA-50/ILmKVaBXiAg/s0/img752348f13017b7af9abd935a4b315a31.jpg?w=840&ssl=1',
	'https://i2.wp.com/afrocosmopolitan.com/wp-content/uploads/2016/11/Amazing-Ankara-Short-Gown-Styles-For-Ladies-afrocosmopolitan.com-african-fashion-latest-ankara-styles-2016-6.jpg?resize=512%2C640',
	'https://s-media-cache-ak0.pinimg.com/736x/14/22/b8/1422b83c4d36cc8439e771c23c7941af.jpg'
     
  ];
  
  public config: ICarouselConfig = {
    verifyBeforeLoad: true,
    log: false,
    animation: true,
    animationType: AnimationConfig.SLIDE,
    autoplay: true,
    autoplayDelay: 3000,
    stopAutoplayMinWidth: 768
  };


  constructor() { }

  ngOnInit() {
  }

}
