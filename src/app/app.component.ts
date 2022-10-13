import { Component } from '@angular/core';
import {
  circleMarker,
  geoJSON,
  GeoJSONOptions,
  LatLng,
  LatLngBounds,
  Map,
  MapOptions,
  tileLayer,
  TileLayer,
} from 'leaflet';
import { Luminaria } from './models/luminaria.model';
import { LuminariesService } from './services/luminaries.service';
import { EventTypes } from './models/event-types.model';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public map!: Map;

  title = 'angular-bootstrap-toast-service';

  EventTypes = EventTypes;

  public mapOptions: MapOptions = {
    zoom: 17,
    zoomControl: false,
    center: [40.395347, -3.694041],
    preferCanvas: true,
  };

  public baseLayer: TileLayer;

  public mapFitBounds: LatLngBounds = new LatLngBounds([
    [37.50547228, -4.22810257],
    [37.70590845000001, -3.98959274],
  ]);

  public constructor(
    public luminariesService: LuminariesService,
    private toastService: ToastService
  ) {
    this.baseLayer = tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        crossOrigin: 'anonymous',
        className: 'OSM',
        maxNativeZoom: 19,
        maxZoom: 22,
        minZoom: 5,
      }
    );
  }

  public onMapReady(map: Map): void {
    this.map = map;
    this.addLuminairesLayer();
  }

  private async addLuminairesLayer(): Promise<void> {
    const luminaires = await (
      await fetch('assets/data/luminarias.geojson')
    ).json();

    const { features: features } = luminaires;
    this.luminariesService.setLuminariesInMap(features);

    const options: GeoJSONOptions = {
      pointToLayer: (feature: GeoJSON.Feature, latLng: LatLng) =>
        circleMarker(latLng),
      style: (feature) => ({
        radius: 8,
        color: '#333',
        fillColor: '#FFFA4D',
        weight: 1,
        opacity: 1,
        fillOpacity: 1,
      }),
    };

    geoJSON(luminaires, options)
      .bindPopup('Luminaria')
      .on('click', (event) => this.valida(event))
      .addTo(this.map);
  }

  valida(event: any): void {
    const {
      layer: {
        feature: { properties: data },
      },
    } = event;
    if (data.id_luminaria) {
      let luminaria = new Luminaria();
      luminaria = data;
      this.luminariesService.setValidLuminaries(true);
      this.luminariesService.setLuminaries(luminaria);
      event.layer.options.fillColor = '#78FF00';
      event.layer.options.color = '#FF2D00';
    } else {
      event.layer.options.fillColor = '#DC3545';
      event.layer.options.color = '#DC3545';
      this.toastService.showErrorToast('Error', 'no se encontró id_luminaria');
    }

    this.map.setView(event.latlng, 18, {
      animate: false,
      duration: 0.5,
      easeLinearity: 0.6,
      noMoveStart: true,
    });
  }
}
