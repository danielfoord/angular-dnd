import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularDndComponent } from './angular-dnd.component';

describe('AngularDndComponent', () => {
  let component: AngularDndComponent;
  let fixture: ComponentFixture<AngularDndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularDndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularDndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
