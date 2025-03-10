import { Component, EnvironmentInjector, inject } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  barbellOutline,
  timeOutline,
  chatboxEllipsesOutline,
  personOutline,
  homeOutline,
  walkOutline,
  bicycleOutline,
  repeatOutline,
  layersOutline,
  peopleOutline,
  checkmarkCircleOutline,
  calendarOutline,
  trashOutline,
  personCircleOutline,
  trophyOutline,
  mailOutline,
  phonePortraitOutline,
  documentTextOutline,
  fitnessOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    // TODO: Move to a new file
    addIcons({
      barbellOutline,
      timeOutline,
      chatboxEllipsesOutline,
      personOutline,
      homeOutline,
      walkOutline,
      bicycleOutline,
      layersOutline,
      repeatOutline,
      peopleOutline,
      checkmarkCircleOutline,
      calendarOutline,
      trashOutline,
      personCircleOutline,
      trophyOutline,
      mailOutline,
      phonePortraitOutline,
      documentTextOutline,
      fitnessOutline,
    });
  }
}
