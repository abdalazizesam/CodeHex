import {AfterViewInit, Component, ViewChild,ElementRef, } from '@angular/core';
import { HighlightLoader } from 'ngx-highlightjs';
import * as ace from "ace-builds";
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.css']
})
export class SubmitPageComponent implements AfterViewInit {

  options = [
    { label: 'C++', value: 1 },
    { label: 'C#', value: 2 },
    { label: 'Java', value: 3 },
    { label: 'Python', value: 4 }
  ];
selected: any;

  

  constructor(private hljsLoader: HighlightLoader){}

  
  @ViewChild("editor") private editor: ElementRef = new ElementRef("editor");  

  aceEditor: any;

  onSelectionChange(option: any){
    console.log(option.value);
    
    switch(this.selected) { 
      case "cpp": { 
        this.aceEditor.session.setMode('ace/mode/c_cpp');
         break; 
      } 
      case "c#": { 
        this.aceEditor.session.setMode('ace/mode/csharp');
         break; 
      } 
      case "java": { 
        this.aceEditor.session.setMode('ace/mode/java');
        break; 
      } 
      case "python": { 
        this.aceEditor.session.setMode('ace/mode/python'); 
        break; 
      } 
      default : {
        this.aceEditor.session.setMode('ace/mode/c_cpp');
      }
   }
  }
   



  ngAfterViewInit(): void {
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    ace.config.set("fontSize", "14px"); 
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.setTheme("ace/theme/dracula");


  }
}
