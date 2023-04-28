import {AfterViewInit, Component, ViewChild,ElementRef, } from '@angular/core';
import { HighlightLoader } from 'ngx-highlightjs';
import * as ace from "ace-builds";

@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.css']
})
export class SubmitPageComponent implements AfterViewInit {
  constructor(private hljsLoader: HighlightLoader){}

  
  @ViewChild("editor") private editor: ElementRef = new ElementRef("editor");   


  ngAfterViewInit(): void {
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    ace.config.set("fontSize", "14px");
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setMode('ace/mode/c_cpp');
  }
}
