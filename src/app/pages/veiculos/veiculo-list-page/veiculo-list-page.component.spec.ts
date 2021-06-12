import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoListPageComponent } from './veiculo-list-page.component';

describe('VeiculoListPageComponent', () => {
  let component: VeiculoListPageComponent;
  let fixture: ComponentFixture<VeiculoListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiculoListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculoListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
