import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin';
  language:any;
  constructor(private translate: TranslateService) {
    if('language' in localStorage){
      this.language = localStorage.getItem('language')
      translate.use(this.language);
    }
    else{
      translate.use(this.translate.defaultLang);
    
    }
   
  }
}
