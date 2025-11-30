
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PasswordGeneratorComponent } from './components/password-generator/password-generator.component';
import { WordCounterComponent } from './components/word-counter/word-counter.component';
import { QrCodeGeneratorComponent } from './components/qr-code-generator/qr-code-generator.component';
import { MetaTagGeneratorComponent } from './components/meta-tag-generator/meta-tag-generator.component';
import { TextToSpeechComponent } from './components/text-to-speech/text-to-speech.component';
import { AiIdeaGeneratorComponent } from './components/ai-idea-generator/ai-idea-generator.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'All-in-One Tools' },
  { path: 'password-generator', component: PasswordGeneratorComponent, title: 'Password Generator' },
  { path: 'word-counter', component: WordCounterComponent, title: 'Word Counter' },
  { path: 'qr-code-generator', component: QrCodeGeneratorComponent, title: 'QR Code Generator' },
  { path: 'meta-tag-generator', component: MetaTagGeneratorComponent, title: 'Meta Tag Generator' },
  { path: 'text-to-speech', component: TextToSpeechComponent, title: 'Text to Speech' },
  { path: 'ai-idea-generator', component: AiIdeaGeneratorComponent, title: 'AI Idea Generator' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
