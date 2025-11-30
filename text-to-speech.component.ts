
import { Component, ChangeDetectionStrategy, signal, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-to-speech',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-to-speech.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextToSpeechComponent {
  text = signal('Hello, world! This is a test of the text-to-speech tool.');
  voices = signal<SpeechSynthesisVoice[]>([]);
  selectedVoice = signal<SpeechSynthesisVoice | null>(null);
  rate = signal(1);
  pitch = signal(1);
  isSpeaking = signal(false);

  constructor() {
    this.populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => this.populateVoiceList();
    }
  }

  populateVoiceList() {
    const availableVoices = speechSynthesis.getVoices();
    this.voices.set(availableVoices);
    if (availableVoices.length > 0 && !this.selectedVoice()) {
      this.selectedVoice.set(availableVoices[0]);
    }
  }

  onTextInput(event: Event) {
    this.text.set((event.target as HTMLTextAreaElement).value);
  }

  onVoiceChange(event: Event) {
    const voiceURI = (event.target as HTMLSelectElement).value;
    const voice = this.voices().find(v => v.voiceURI === voiceURI) || null;
    this.selectedVoice.set(voice);
  }

  onRateChange(event: Event) {
    this.rate.set(Number((event.target as HTMLInputElement).value));
  }
  
  onPitchChange(event: Event) {
    this.pitch.set(Number((event.target as HTMLInputElement).value));
  }

  speak() {
    if (this.isSpeaking()) return;

    const utterance = new SpeechSynthesisUtterance(this.text());
    utterance.voice = this.selectedVoice();
    utterance.pitch = this.pitch();
    utterance.rate = this.rate();

    utterance.onstart = () => this.isSpeaking.set(true);
    utterance.onend = () => this.isSpeaking.set(false);
    utterance.onerror = () => this.isSpeaking.set(false);
    
    speechSynthesis.speak(utterance);
  }

  stop() {
    speechSynthesis.cancel();
    this.isSpeaking.set(false);
  }
}
