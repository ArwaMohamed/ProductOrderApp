import { Directive, ElementRef, inject, Input, OnChanges, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appLowStock]',
  standalone: true
})
export class LowStockDirective implements OnChanges{
  @Input('appLowStock') availablePieces!: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (this.availablePieces <= 10) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid #f57c00');
      this.renderer.setStyle(this.el.nativeElement, 'animation', 'pulse 1s infinite');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'border');
      this.renderer.removeStyle(this.el.nativeElement, 'animation');
    }
  }
}
