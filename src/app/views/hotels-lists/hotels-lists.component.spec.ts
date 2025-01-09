import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsListsComponent } from './hotels-lists.component';

describe('HotelsListsComponent', () => {
  let component: HotelsListsComponent;
  let fixture: ComponentFixture<HotelsListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelsListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelsListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
