// 1-tokenizer.js

//tokenの作成
export function tokenizer(input) {
  let current = 0; //コードのcurrentの位置
  let tokens = []; 

  while (current < input.length) {
    let char = input[current]; //inputのcurrentの文字

    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '(',
      });
      current++;
      continue;
    }

    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
      });
      current++;
      continue;
    }

    //空白のcheck　トークンとして格納する必要はない
    const WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    //数字
    // 数値は任意の数の文字にして一連の文字全体を1つのトークンとしてキャプチャする
    //１文字ではなく（123 456）の場合などが考えられるので以下の処理
    const NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = '';

      //数値が続く限り
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: 'number', value });
      continue;
    }

    //文字列
    // concat "foo" "bar"
    if (char === '"') {
      let value = '';

      //token内の最初の「 " 」はskip
      char = input[++current];
      
      //最後の「 " 」まで繰り返す
      while (char != '"') {
        value += char;
        char = input[++current];
      }

      //閉じ「 " 」もskip
      char = input[++current];

      tokens.push({ type: 'string', value });

      continue;
    }

    // name token(lisp構文の関数名)
    // (add 2 4) のadd部分
    const LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = '';

      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: 'name', value});
      continue;
    }
    //例外処理
    //文字が一致していない場合
    alert('正しい構文を入力してください');
    throw new TypeError('I dont know what this character is: ' + char);
  }
  //tokens配列を返す
  return tokens;
}
