import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourcesGestionComponent } from './ressources-gestion.component';

describe('RessourcesGestionComponent', () => {
  let component: RessourcesGestionComponent;
  let fixture: ComponentFixture<RessourcesGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RessourcesGestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RessourcesGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
