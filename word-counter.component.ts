
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-word-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-counter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordCounterComponent {
  text = signal('');

  stats = computed(() => {
    const content = this.text().trim();
    if (!content) {
      return { words: 0, characters: 0, sentences: 0 };
    }

    const words = content.split(/\s+/).filter(word => word.length > 0).length;
    const characters = content.length;
    const sentences = (content.match(/[.!?]+ /g) || []).length + (content.length > 0 ? 1 : 0);
    
    return { words, characters, sentences };
  });

  onTextInput(event: Event) {
    this.text.set((event.target as HTMLTextAreaElement).value);
  }

  clearText() {
    this.text.set('');
  }
}
