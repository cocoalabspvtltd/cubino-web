import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentEarningsComponent } from './agent-earnings.component';

describe('AgentEarningsComponent', () => {
  let component: AgentEarningsComponent;
  let fixture: ComponentFixture<AgentEarningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentEarningsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
