import {Component, OnInit} from '@angular/core';

@Component({
    template: `
  <div id="title_box">  
  <img src="http://www.mistbox.com/images/mistbox-logo.svg">
    <h1 style="margin-left: 75px;">Data CRM</h1>
        <h4>Please log in to see your Mistbox savings.</h4>
  </div>
    `,
    styles: [`
#title_box {
    position: absolute;
    top: 30%;
    left: 50%;
    margin: -100px 0 0 -150px;
}
    
    `],
})
export class HomeComponent  {
}