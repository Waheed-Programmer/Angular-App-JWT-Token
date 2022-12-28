import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResturantDashComponent } from './resturant-dash.component';

describe('ResturantDashComponent', () => {
  let component: ResturantDashComponent;
  let fixture: ComponentFixture<ResturantDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResturantDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResturantDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
