import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesFormsComponent } from './pages-forms.component';

describe('PagesFormsComponent', () => {
  let component: PagesFormsComponent;
  let fixture: ComponentFixture<PagesFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
