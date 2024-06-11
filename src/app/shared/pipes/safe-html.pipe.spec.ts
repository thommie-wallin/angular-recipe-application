import { TestBed } from '@angular/core/testing';
import { SafeHtmlPipe } from './safe-html.pipe';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule],
      providers: [SafeHtmlPipe]
    }).compileComponents();

    pipe = TestBed.inject(SafeHtmlPipe);
    sanitizer = TestBed.inject(DomSanitizer);
  });

  // Checks the pipe instance creation.
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  // Verifies that the transform method returns the sanitized HTML using DomSanitizer.
  it('should bypass security and return safe HTML', () => {
    const htmlString = '<div>Test HTML</div>';
    const safeHtml = pipe.transform(htmlString);
    const expected = sanitizer.bypassSecurityTrustHtml(htmlString);
    expect(safeHtml).toEqual(expected);
  });
});
