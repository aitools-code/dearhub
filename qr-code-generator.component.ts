
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qr-code-generator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qr-code-generator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrCodeGeneratorComponent {
  qrText = signal('https://angular.dev');
  qrApiUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=';

  qrCodeUrl = computed(() => {
    const text = this.qrText();
    return text ? `${this.qrApiUrl}${encodeURIComponent(text)}` : '';
  });

  onTextChange(event: Event) {
    this.qrText.set((event.target as HTMLInputElement).value);
  }
}
