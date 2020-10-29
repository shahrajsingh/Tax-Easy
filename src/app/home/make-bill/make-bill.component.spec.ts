import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeBillComponent } from './make-bill.component';

describe('MakeBillComponent', () => {
  let component: MakeBillComponent;
  let fixture: ComponentFixture<MakeBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
