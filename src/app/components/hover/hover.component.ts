import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hover',
  templateUrl: './hover.component.html',
  styleUrls: ['./hover.component.scss'],
  host:{
    class : 'app-hover-class'
  }
})
export class HoverComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
