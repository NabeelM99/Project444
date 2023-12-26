import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  public id!: string;
  constructor(public route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }
}
