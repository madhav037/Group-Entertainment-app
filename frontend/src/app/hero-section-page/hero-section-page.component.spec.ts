import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSectionPageComponent } from './hero-section-page.component';

describe('HeroSectionPageComponent', () => {
  let component: HeroSectionPageComponent;
  let fixture: ComponentFixture<HeroSectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroSectionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroSectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
