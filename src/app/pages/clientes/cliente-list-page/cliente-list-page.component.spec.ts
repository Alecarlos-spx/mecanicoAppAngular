import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteListPageComponent } from './cliente-list-page.component';

describe('ClienteListPageComponent', () => {
  let component: ClienteListPageComponent;
  let fixture: ComponentFixture<ClienteListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
