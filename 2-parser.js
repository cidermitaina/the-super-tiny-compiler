// 2-parser.js

// tokenを受け取り、ASTにする
export function parser(tokens) {
  let current = 0; //現在位置
  
  function walk () {

    let token = tokens[current];

    // numberがあるとき
    if (token.type === 'number') {
      current++;

      //NumberLiteral nodeを作成
      return {
        type: 'NumberLiteral',
        value: token.value,
      };
    }
    
    // stringがあるとき
    if (token.type === 'string') {
      current++;

      //StringLiteral nodeを作成
      return {
        type: 'StringLiteral',
        value: token.value,
      };
    }

    // parenと 「 ( 」のときはASTに必要ないので次に
    if (token.type === 'paren' && token.value === '(') {

      token = tokens[++current];

      let node = {
        type: 'CallExpression',
        name: token.value,
        params:[],
      }

      token = tokens[++current];

      //「 ) 」まで　callExpression のparamsとなる各tokenをwhile文でループ
      while (
        (token.type !== 'paren') ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        node.params.push(walk());
        token = tokens[current];
        if (token === undefined) {
          alert('正しい構文を入力してください');
        }
      }

      // 「 ) 」のときskip
      current++;
      return node;
    }
    //例外処理
    alert('正しい構文を入力してください');
    throw new TypeError(token.type);
  }

  // rootのASTを作成
  let ast = {
    type: 'Program',
    body: [],
  };

  //ループ内でast.body.push(walk())を行う;
  while (current < tokens.length) {
    ast.body.push(walk());
  }
  return ast;
}
