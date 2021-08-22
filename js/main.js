var app = new Vue({
  el : '#app',
  data : {
    memory : null,
    func : null,
    inputValue : 0, 
    outputValue : 0,
    isError : false, //エラー時かどうか
  },
  methods : {
    error() { //エラー時のメソッド
      this.memory = null;
      this.func = null;
      inputValue = 0;
      //データを初期化
      isError = true;
    },
    clear() { //クリアするメソッド
      this.isError = false; //クリアを押したときはエラー状態を解除
      //データを初期化
      this.memory = null;
      this.func = null;
      this.inputValue = 0;
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

      return val;
    
    },

    inputNumber(number) { //数値を押したときのイベントメソッド
      if(this.isError) {
        return;
      }
      // if(number == '.' && this.outputValue.indexOf('.') < -1){
      //   return;
      // }

      //0の時はただ変換するだけ
      if(this.inputValue == 0) {
        this.inputValue = number;
        this.outputValue = this.inputValue;
        return;
      }
      var parsed = parseInt(this.inputValue.toString() + number.toString()); //文字列の連結→整数にして29などを表現 
      this.inputValue = parsed;
      this.outputValue = this.inputValue; 
    },
    inputFunc(func) { //演算子を押したときのイベントメソッド
      if(this.isError) {
        return;
      }
     
      var val = this.calc(this.memory,func,this.inputValue); //memoryがどんどんん蓄積されていくからイコールと同様の処理になる
      
      if(!isNaN(val)) { //valがNaNでない場合
        this.memory = val; 
        this.func = func; // イコール時に起動させるために設定
        this.inputValue = 0; //inputValueを初期化
        this.outputValue = val;
      }
    },
    equal() { //＝を押した時のイベントメソッド
      if(this.isError ||  this.memory == null || this.func == null) {
        return;
      }
      var val = this.calc(this.memory , this.func , this.inputValue);
      if(!isNaN(val)) {
        this.memory = val; 
        this.func = null; //初期化
        this.inputValue = 0; //初期化
        this.outputValue = val; 
      }
    }
  }
});

