import {animate, style, transition, trigger} from "@angular/animations";

export const visibilityErrorOrSuccess = [
  trigger('visibility', [
    transition(':enter', [
      style({width: 0, opacity: 0}),
      animate('850ms')
    ])
  ])
]
