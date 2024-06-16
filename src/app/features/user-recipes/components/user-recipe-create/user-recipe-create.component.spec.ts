import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecipeCreateComponent } from './user-recipe-create.component';

describe('UserRecipeCreateComponent', () => {
  let component: UserRecipeCreateComponent;
  let fixture: ComponentFixture<UserRecipeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRecipeCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRecipeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
