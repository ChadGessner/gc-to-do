import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfilteredComponent } from './unfiltered.component';

describe('UnfilteredComponent', () => {
  let component: UnfilteredComponent;
  let fixture: ComponentFixture<UnfilteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnfilteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnfilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
