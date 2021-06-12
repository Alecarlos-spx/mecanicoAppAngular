import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoPageComponent } from './veiculo-page.component';

describe('VeiculoPageComponent', () => {
  let component: VeiculoPageComponent;
  let fixture: ComponentFixture<VeiculoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiculoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
