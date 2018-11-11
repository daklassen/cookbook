import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Animations } from '../../../animations/Animations';
import { Breadcrumb } from './Breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  animations: [Animations.fadeInAndOut],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input()
  breadcrumps: Breadcrumb[];
  @Input()
  titleKey: string;
  @Input()
  subtitleKey: string;
  @Input()
  title: string;
  @Input()
  subtitle: string;

  @Input()
  buttonLabelKey: string;
  @Output()
  buttonClicked: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
