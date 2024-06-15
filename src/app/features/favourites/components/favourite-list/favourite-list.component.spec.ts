import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesListComponent } from './favourite-list.component';

describe('FavouriteListComponent', () => {
  let component: FavouritesListComponent;
  let fixture: ComponentFixture<FavouritesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavouritesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
