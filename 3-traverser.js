// 3-traverser.js

// traverser関数内で2つの関数（traverseArray,traverseNode）を定義
export function traverser(ast, visitor) {
  
  // childを繰り返し処理して次の関数を呼び出す
  function traverseArray (array, parent) {
    array.forEach(child => {
      traverseNode(child, parent);
    });
  }

  // node と parent nodeを受け取る
  function traverseNode(node, parent) {
    
    let methods = visitor[node.type];
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

     // traverseArrayをそれぞれのnode.typeで実行。ツリーを再帰的に横断
    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node)
        break;

      case 'CallExpression':
        traverseArray(node.params, node);
        break;
      // NumberLiteralとStringLiteralの場合は子nodeがないので、抜ける
      // (if (methods && methods.exit))の処理
      case 'NumberLiteral':
      case 'StringLiteral':
        break;
      default:
        throw new TypeError(node.type);
    }

    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  // ASTの最上位には親がないため、null
  traverseNode(ast, null);
}
