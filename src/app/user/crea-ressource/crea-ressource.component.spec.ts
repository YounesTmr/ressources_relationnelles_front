import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaRessourceComponent } from './crea-ressource.component';

describe('CreaRessourceComponent', () => {
  let component: CreaRessourceComponent;
  let fixture: ComponentFixture<CreaRessourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreaRessourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
