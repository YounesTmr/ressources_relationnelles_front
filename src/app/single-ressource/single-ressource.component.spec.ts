import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRessourceComponent } from './single-ressource.component';

describe('SingleRessourceComponent', () => {
  let component: SingleRessourceComponent;
  let fixture: ComponentFixture<SingleRessourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleRessourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
