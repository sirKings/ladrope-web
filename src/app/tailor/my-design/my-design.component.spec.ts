import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDesignComponent } from './my-design.component';

describe('MyDesignComponent', () => {
  let component: MyDesignComponent;
  let fixture: ComponentFixture<MyDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
