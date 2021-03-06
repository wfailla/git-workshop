import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import 'gitgraph.js';

declare var GitGraph: any;

let IDENTIFIER = 0;


@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements AfterViewInit {
  @Input() public setup: (config: any) => void;

	public id: number;

  constructor() {
		this.id = IDENTIFIER++;
  }

  public ngAfterViewInit(): void {
		const config = {
      template: new GitGraph.Template(
				{
          colors: ["#8bc34a", "#008fb5", "#f1c109", "#673ab7"],
          branch: {
            lineWidth: 12,
            spacingX: 50,
            labelRotation: 0
          },
          commit: {
            widthExtension: 650,
            spacingY: -80,
            dot: {
              size: 20,
              font: 'normal 16pt Hack',
            },
						tag: {
							font: 'normal 28pt Hack',
							color: 'white',
						},
            message: {
              font: 'normal 28pt Hack',
							displayHash: false,
							displayAuthor: false,
            }
          }
        }
			),
      orientation: 'vertical-reverse',
      elementId: 'gitGraph-' + this.id,
			author: '',
			tagColor: 'white',
    };

		if (!!this.setup) {
    	this.setup(config);
		}
  }
}
