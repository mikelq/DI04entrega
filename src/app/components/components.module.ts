import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';



@NgModule({
  declarations: [
    BarChartComponent,
    LineChartComponent,
    PieChartComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    BarChartComponent, LineChartComponent, PieChartComponent
  ],
  exports: [
    BarChartComponent, LineChartComponent, PieChartComponent
  ]
})
export class ComponentsModule { }