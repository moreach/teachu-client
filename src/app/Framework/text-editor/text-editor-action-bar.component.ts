import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import * as RoosterJs from 'roosterjs-editor-api';
import { IEditor } from 'roosterjs-editor-types';

@Component({
  selector: 'app-text-editor-action-bar',
  templateUrl: './text-editor-action-bar.component.html',
  styleUrls: ['./text-editor-action-bar.component.scss']
})
export class TextEditorActionBarComponent {

  @Input() editor!: IEditor;
  roosterJs = RoosterJs;
  isTitle = false;

  editorFields: KeyValue<string, string>[] = [
    { key: 'title', value: 'title'},
    { key: 'bold', value: 'format_bold'},
    { key: 'italic', value: 'format_italic'},
    { key: 'underline', value: 'format_underlined'},
    { key: 'strikethrough', value: 'format_strikethrough'},
    { key: 'bulletlist', value: 'format_list_bulleted'},
    { key: 'numberlist', value: 'format_list_numbered'},
  ];

  constructor() { }

  editorClick(eventKey: string, editor: IEditor) {
      switch (eventKey) {
          case 'title':
            const newFont = this.isTitle ? 1 : 0;
            for (let i = 0; i < 3; i++) {
              this.roosterJs.changeFontSize(editor, newFont);
            }
            this.isTitle = !this.isTitle;
            break;
          case 'bold':
              this.roosterJs.toggleBold(editor);
              break;
          case 'italic':
              this.roosterJs.toggleItalic(editor);
              break;
          case 'underline':
              this.roosterJs.toggleUnderline(editor);
              break;
          case 'strikethrough':
              this.roosterJs.toggleStrikethrough(editor);
              break;
          case 'bulletlist':
              this.roosterJs.toggleBullet(editor);
              break;
          case 'numberlist':
              this.roosterJs.toggleNumbering(editor);
              break;
      }
  }
}
