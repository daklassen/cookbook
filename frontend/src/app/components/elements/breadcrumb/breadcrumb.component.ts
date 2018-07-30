import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Breadcrumb } from '../../../models/view/Breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() breadcrumps: Breadcrumb[];
  @Input() titleKey: string;
  @Input() subtitleKey: string;
  @Input() title: string;
  @Input() subtitle: string;

  @Input() buttonLabelKey: string;
  @Output() onButtonClicked: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
