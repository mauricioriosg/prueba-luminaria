import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Luminaria } from '../models/luminaria.model';
import { LuminariesService } from '../services/luminaries.service';

@Component({
  selector: 'app-luminaries-charge',
  templateUrl: './luminaries-charge.component.html',
  styleUrls: ['./luminaries-charge.component.css'],
})
export class LuminariesChargeComponent implements OnInit, DoCheck {
  luminaries: Luminaria[] = [];
  constructor(public luminariesService: LuminariesService) {}

  ngOnInit(): void {
    this.luminaries = this.luminariesService.getLuminaries();
  }

  ngDoCheck(): void {
    if (this.luminariesService.getValidLuminaries()) {
      this.luminaries = this.luminariesService.getLuminaries();
      this.luminariesService.setValidLuminaries(false);
    }
  }
  watchInfoComplete(luminary: Luminaria) {
    luminary.info_completa = !luminary.info_completa ? true : false;
    this.luminariesService.updateLuminaryVisibility(luminary);
    this.luminariesService.setValidLuminaries(true);
  }
}
