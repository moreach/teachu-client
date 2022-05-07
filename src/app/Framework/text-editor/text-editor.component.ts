import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Editor, IEditor } from 'roosterjs';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, OnDestroy {

  editor: any;
  currentContent: string = '';

  @ViewChild('textEditor', { static: true }) textEditor!: ElementRef<HTMLDivElement>;

  @Input() set content(content: string) {
    if (content !== this.currentContent) {
      this.currentContent = content;
      if (this.editor) {
        this.editor.setContent(content);
      }
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.editor = new Editor(this.textEditor.nativeElement, {
      defaultFormat: {
        fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
        fontSize: '14px'
      },
      initialContent: this.currentContent
    });
  }

  ngOnDestroy(): void {
    this.editor.dispose();
    this.editor = null;
  }

  getEditor(): IEditor {
    return this.editor as IEditor;
  }
}
