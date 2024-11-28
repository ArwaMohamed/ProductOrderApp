import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTooltipModule } from "@angular/material/tooltip";
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,MatTooltipModule,CommonModule,AppRoutingModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
