import {Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {ForDirectiveService} from "./for-directive.service";

@Directive({
  selector: '[appDashboardChose]'
})
export class DashboardChoseDirective implements OnInit {

  constructor(
    private element: ElementRef,
    private render: Renderer2,
    private forDirectiveService: ForDirectiveService
  ) {
  }

  ngOnInit(): void {
  }

  @HostListener('click') onClick() {
    if (this.forDirectiveService.pasteElement) {
      this.forDirectiveService.pasteElement.nativeElement.style.border = null
      this.forDirectiveService.pasteElement.nativeElement.style.opacity = 1
    }
    this.forDirectiveService.pasteElement = this.element
    this.render.setStyle(this.element.nativeElement, 'border', '3px solid green')
    this.render.setStyle(this.element.nativeElement, 'transition', 'border-color 0.7s')
    this.render.setStyle(this.element.nativeElement, 'opacity', '0.8')
  }


}
