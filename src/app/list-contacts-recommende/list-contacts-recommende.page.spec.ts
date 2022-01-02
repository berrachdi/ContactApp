import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListContactsRecommendePage } from './list-contacts-recommende.page';

describe('ListContactsRecommendePage', () => {
  let component: ListContactsRecommendePage;
  let fixture: ComponentFixture<ListContactsRecommendePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListContactsRecommendePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListContactsRecommendePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
