import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  Lang:any='en';
 constructor(private translate:TranslateService , private router: Router ){
  // this.lang = this.translate.currentLang;
  this.Lang=this.translate.currentLang;
  
 }
  //CHANGE LANGUAGE 
  shangeLanguage(){
    if(this.Lang =='en'){
      console.log(this.Lang ,"1")
      localStorage.setItem('language' ,'ar');
      window.location.reload();
   
    }
    else{
      localStorage.setItem('language','en');
      console.log(this.Lang ,"2");
      window.location.reload()
    };
    
  
   
  }
 
}
