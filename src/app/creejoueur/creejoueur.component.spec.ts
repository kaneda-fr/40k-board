import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreejoueurComponent } from './creejoueur.component';

describe('CreejoueurComponent', () => {
  let component: CreejoueurComponent;
  let fixture: ComponentFixture<CreejoueurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreejoueurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreejoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
