import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-design',
  templateUrl: './my-design.component.html',
  styleUrls: ['./my-design.component.css']
})
export class MyDesignComponent implements OnInit {

image1 = 'https://i1.wp.com/lh3.googleusercontent.com/-hoO9Asm2bwM/VvR3qF9MDzI/AAAAAAAA-50/ILmKVaBXiAg/s0/img752348f13017b7af9abd935a4b315a31.jpg?w=840&ssl=1'

image2 = 'https://i2.wp.com/afrocosmopolitan.com/wp-content/uploads/2016/11/Amazing-Ankara-Short-Gown-Styles-For-Ladies-afrocosmopolitan.com-african-fashion-latest-ankara-styles-2016-6.jpg?resize=512%2C640'


image3 = 'https://s-media-cache-ak0.pinimg.com/736x/14/22/b8/1422b83c4d36cc8439e771c23c7941af.jpg'

  constructor() { }

  ngOnInit() {
  }

}
