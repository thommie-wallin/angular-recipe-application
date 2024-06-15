import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListComponent } from './recipe-list.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeListComponent, BrowserAnimationsModule],
      providers: [HttpClient, HttpHandler],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
