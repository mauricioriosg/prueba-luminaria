import { Component, OnInit, Input } from '@angular/core';
import { Luminaria } from '../models/luminaria.model';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.css']
})
export class DetailInfoComponent implements OnInit {

  @Input() luminaria?: Luminaria;
  constructor() { }

  ngOnInit(): void {
  }

}
