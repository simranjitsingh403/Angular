import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nobleui-angular';
  
  constructor(@Inject(DOCUMENT) private document: Document){}

  ngOnInit(): void {
    if(localStorage.getItem('isDark') != null){
      if(localStorage.getItem('isDark') == 'true'){
        this.document.body.classList.add('sidebar-dark', 'dark-mode');
      }else{
        this.document.body.classList.add('sidebar-light');
      }

    }else{
      localStorage.setItem('isDark','true');
      this.document.body.classList.add('sidebar-dark', 'dark-mode');
    }
  }

}
