import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {
  backgroundImages: string[] = [];
  currentBackgroundImage: string = 'assets/images/1.jpg';

  constructor() {}

  ngOnInit(): void {
    this.fetchBackgroundImages();
  }

  fetchBackgroundImages(): void {
    this.backgroundImages = [
      'assets/images/1.jpg',
      'assets/images/2.jpg',
      'assets/images/3.jpg',
      'assets/images/4.jpg',
      'assets/images/5.jpg'
    ];
    this.changeBackgroundImage();
    console.log(this.currentBackgroundImage);
  }

  changeBackgroundImage(): void {
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * this.backgroundImages.length);
      this.currentBackgroundImage = this.backgroundImages[randomIndex];
    }, 1500);
  }
}
