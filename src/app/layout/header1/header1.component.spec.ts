import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header1Component } from './header1.component';

describe('Header1Component', () => {
  let component: Header1Component;
  let fixture: ComponentFixture<Header1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Header1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
