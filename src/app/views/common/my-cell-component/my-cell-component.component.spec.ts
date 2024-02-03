import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCellComponentComponent } from './my-cell-component.component';

describe('MyCellComponentComponent', () => {
  let component: MyCellComponentComponent;
  let fixture: ComponentFixture<MyCellComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCellComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCellComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
