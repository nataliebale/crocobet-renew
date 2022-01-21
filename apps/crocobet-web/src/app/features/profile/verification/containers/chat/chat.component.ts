import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { liveCallerScript } from './live-caller-script';
import { finalize, tap, timer } from 'rxjs';

@Component({
  selector: 'crc-w-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('liveCallerScript') liveCallerScript: ElementRef;
  loading = true;

  constructor(
    private readonly renderer: Renderer2,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const liveCallerDiv = document.querySelectorAll('div[data-livecaller]');
    if (liveCallerDiv.length > 0) {
      liveCallerDiv[0]['style'].display = 'none';
    }
  }

  ngAfterViewInit() {
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'id', 'live-caller');
    const text = this.renderer.createText(liveCallerScript);
    this.renderer.appendChild(script, text);
    this.renderer.appendChild(this.liveCallerScript.nativeElement, script);

    timer(1000)
      .pipe(
        tap((_) => (this.loading = false)),
        finalize(() => this.cdr.detectChanges())
      )
      .subscribe();
  }

  ngOnDestroy() {
    document.querySelectorAll('[data-livecaller="mount-el"]')[0][
      'style'
    ].display = 'block';
    document.getElementById('live-caller').remove();
  }
}
