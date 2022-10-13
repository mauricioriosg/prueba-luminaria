import { Injectable } from '@angular/core';
import { Luminaria } from '../models/luminaria.model';
import { LuminariaInMap } from '../models/luminariaInMap.model';

@Injectable({
  providedIn: 'root',
})
export class LuminariesService {
  public validLuminaries = false;
  public lumininaries: Luminaria[] = [];
  public luminariaesInMap: LuminariaInMap[] = [];

  setValidLuminaries(validLuminaries: boolean) {
    this.validLuminaries = validLuminaries;
  }

  setLuminariesInMap(features: []) {
    features.forEach((feature) => {
      this.luminariaesInMap.push(feature['properties']);
    });
    localStorage.setItem(
      'luminariesInMap',
      JSON.stringify(this.luminariaesInMap)
    );
  }

  getLuminariesInMap() {
    let luminariesFromSt = localStorage.getItem('luminariesInMap');
    let luminaries = [];
    if (this.luminariaesInMap && this.luminariaesInMap.length > 0) {
      luminaries = this.luminariaesInMap;
    } else if (luminariesFromSt) {
      luminaries = JSON.parse(luminariesFromSt);
    }
    return luminaries;
  }

  getValidLuminaries(): boolean {
    return this.validLuminaries;
  }

  setLuminaries(luminaries: Luminaria) {
    let valida = this.lumininaries.find(
      (elementI) => elementI.id_luminaria === luminaries.id_luminaria
    );
    if (!valida) {
      this.lumininaries.push(luminaries);
      luminaries.info_completa = true;
      this.updateLuminaryVisibility(luminaries);
    } else {
      luminaries.info_completa = true;
      this.updateLuminaryVisibility(luminaries);
    }
  }

  removeLuminary(luminary: Luminaria) {
    this.lumininaries = this.lumininaries.filter(
      (lumi) => lumi.id_luminaria !== luminary.id_luminaria
    );
  }

  updateLuminaryVisibility(luminary: Luminaria) {
    this.lumininaries.map((lumi) => {
      if (lumi.id_luminaria === luminary.id_luminaria) {
        lumi.info_completa = luminary.info_completa;
      } else {
        lumi.info_completa = false;
      }
    });
  }

  getLuminaries(): Luminaria[] {
    return this.lumininaries;
  }
}
