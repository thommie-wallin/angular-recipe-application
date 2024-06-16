import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecipeEditComponent } from './user-recipe-edit.component';

describe('UserRecipeEditComponent', () => {
  let component: UserRecipeEditComponent;
  let fixture: ComponentFixture<UserRecipeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRecipeEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
