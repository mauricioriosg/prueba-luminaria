import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { DetailInfoComponent } from './detail-info/detail-info.component';
import { LuminariesChargeComponent } from './luminaries-charge/luminaries-charge.component';
import { ToastComponent } from './toast/toast.component';
import { ToasterComponent } from './toaster/toaster.component';
import { ChartDetailComponent } from './chart-detail/chart-detail.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    DetailInfoComponent,
    LuminariesChargeComponent,
    ToastComponent,
    ToasterComponent,
    ChartDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    HighchartsChartModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
