import {
  Component,
  ElementRef,
  ViewChild,
  Renderer2,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements AfterViewInit {
  @Input() title: string = '';
  @Input() body: string = '';
  @Input() link: string = '';
  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('truncator') truncator: ElementRef<HTMLElement> | any;
  @ViewChild('bodyText') bodyText: ElementRef<HTMLElement> | any;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Work out if there is a text overflow and if not, then hide the truncator
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue('height'), 10);

    if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      // Show the truncator when overflow exists.
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      // There is a text overflow -> hide the fade out truncator.
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

  onXButtonClick() {
    this.deleteEvent.emit();
  }
}
