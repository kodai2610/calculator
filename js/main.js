Vue.component('calculator-component', {
  data : function() { //コンポーネントごとにデータを保持
    return {
      memory : null, //number
      func : null, //string
      inputValue : '0', //string 
      outputValue : '0', //string
      isError : false, //エラー時かどうか
    }
  },
  methods : {
    error() { //エラー時のメソッド
      this.memory = null;
      this.func = null;
      this.inputValue = '0';
      this.outputValue = '0';
      //データを初期化
      isError = true;
    },
    clear() { //クリアするメソッド
      this.isError = false; //クリアを押したときはエラー状態を解除
      //データを初期化
      this.memory = null;
      this.func = null;
      this.inputValue = '0';
      this.outputValue = this.inputValue;
    },
    calc(memory,func,input) { //計算するメソッド ・演算子を入力したタイミングorイコールを押したタイミングでメモリに数値があれば計算
      if(memory == null) {
        return input;
      }
      var val = 0;
      if(func == '+') {
        val = memory + input;
      }
      if(func == '-') {
        val = memory - input;
      }
      if(func == '*') {
        val = memory * input;
      }
      if(func == '/') {
        val = memory / input;
      }
      if(func == '%') { //余りの計算
        val = memory % input;
      }

      return val;
    
    },

    inputNumber(number) { //数値を押したときのイベントメソッド
      if(this.isError) {
        return;
      }
      if(this.inputValue == '0' && number == '+/-') { //-0になるのを防ぐ
        return;
      }
      if(this.inputValue == '0' && number !== '.' && number !== '+/-') { //純粋に0の時はただ変換するだけ
          this.inputValue = number;
          this.outputValue = this.inputValue;
          return;
      }
      if(number == '+/-') { // +/-の時はinputValueを変換
        this.inputValue = -1 * this.inputValue;
        this.outputValue = this.inputValue;
        return;
      }
      var parsed = this.inputValue + number; //文字列の連結
      this.inputValue = parsed;
      this.outputValue = this.inputValue; 
    },
    inputFunc(func) { //演算子を押したときのイベントメソッド
      if(this.isError) {
        return;
      }
      if(this.inputValue == '0') { //イコール後
        this.func = func;
        return;
      }
      var val = this.calc(this.memory,func, Number(this.inputValue)); //memoryがどんどんん蓄積されていくからイコールと同様の処理になる
      if(!isNaN(val)) { //valがNaNでない場合
        this.memory = val; 
        this.func = func; // イコール時に起動させるために設定
        this.inputValue = '0'; //inputValueを初期化
        this.outputValue = val.toLocaleString(undefined, {maximumFractionDigits : 3}); //小数点第三位まで表示
      }
    },
    equal() { //＝を押した時のイベントメソッド
      if(this.isError ||  this.memory == null || this.func == null) {
        return;
      }
      var val = this.calc(this.memory , this.func , Number(this.inputValue));
      if(!isNaN(val)) {
        this.memory = val; 
        this.func = null; //初期化
        this.inputValue = '0'; //初期化
        this.outputValue = val.toLocaleString(undefined, {maximumFractionDigits: 3});
      }
    }
  },
  template : `
  <div> 
  <div class="bl_display"><span class="el_output">{{outputValue}}</span></div><!--bl_display-->
  <div class="bl_crossTable">
    <table>
      <tbody>
        <tr>
          <td><span class="el_btn el_btn__dark" v-on:click="clear">C</span></td>
          <td><span class="el_btn el_btn__dark" v-on:click="inputNumber('+/-')">+/-</span></td>
          <td><span class="el_btn el_btn__dark" v-on:click="inputFunc('%')">%</span></td>
          <td><span class="el_btn el_btn__dark" v-on:click="inputFunc('/')">÷</span></td>
        </tr>
        <tr>
          <td v-for="number in ['7','8','9']"><span class="el_btn" v-on:click="inputNumber(number)">{{number}}</span></td>
          <td><span class="el_btn el_btn__dark" v-on:click="inputFunc('*')">×</span></td>
        </tr>
        <tr>
          <td v-for="number in ['4','5','6']"><span class="el_btn" v-on:click="inputNumber(number)">{{number}}</span></td>
          <td><span class="el_btn el_btn__dark" v-on:click="inputFunc('-')">-</span></td>
        </tr>
        <tr>
          <td v-for="number in ['1','2','3']"><span class="el_btn" v-on:click="inputNumber(number)">{{number}}</span></td>
          <td><span class="el_btn el_btn__dark" v-on:click="inputFunc('+')">+</span></td>
        </tr>
        <tr>
          <td colspan="2"><span class="el_btn el_btn__big" v-on:click="inputNumber('0')">0</span></td>
          <td><span class="el_btn" v-on:click="inputNumber('.')">.</span></td>
          <td><span class="el_btn el_btn__blue" v-on:click="equal">=</span></td>
        </tr>
      </tbody> 
    </table>
  </div><!--bl_crossTable-->
  </div>
  `,
})

var app = new Vue({
  el : '#app',
});

