import {Component, EventEmitter, Output, signal} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [
    NgForOf,
  ],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss'
})
export class KeyboardComponent {
  @Output() keyPress = new EventEmitter<string>();
  row1 = ['1','2','3','4','5','6','7','8','9','0'];
  row2 = ['q','w','e','r','t','z','u','i','o','p', 'ü'];
  row2_capital = ["Q","W","E","R","T","Z","U","I","O","P", 'Ü']
  row3 = ['a','s','d','f','g','h','j','k','l','ö','ä'];
  row3_capital = ["A","S","D","F","G","H","J","K","L",'Ö','Ä'];
  row4 = ['y','x','c','v','b','n','m'];
  row4_capital = ["Y","X","C","V","B","N","M"];

  row1_signal = signal(this.row1);
  row2_signal = signal(this.row2);
  row3_signal = signal(this.row3);
  row4_signal = signal(this.row4);
  capital = false;

  sendKey(key: string) {
    if (key == 'Shift'){
      if (this.capital){
        this.row2_signal.set(this.row2);
        this.row3_signal.set(this.row3);
        this.row4_signal.set(this.row4);
        this.capital = false;
      }else {
        this.row2_signal.set(this.row2_capital);
        this.row3_signal.set(this.row3_capital);
        this.row4_signal.set(this.row4_capital);
        this.capital = true;
      }
    }else {
      this.keyPress.emit(key);
    }
  }
}
