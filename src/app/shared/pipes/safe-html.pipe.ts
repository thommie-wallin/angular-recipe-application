import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true,
  pure: true
})
export class SafeHtmlPipe implements PipeTransform {
  sanitizer = inject(DomSanitizer)

  // constructor(private sanitizer: DomSanitizer) {}

  transform(html: string): unknown {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  };
};