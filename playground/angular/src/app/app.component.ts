import { Component } from '@angular/core';
import { DocumentationComponent } from './documentation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DocumentationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
}

