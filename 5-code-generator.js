// 5-code-generator.js

// 再帰的に自分自身を呼び出して各ノードを表示
// ツリーを1つの巨大な文字列にする。
export function codeGenerator(node) {
  
  switch (node.type) {
    case 'Program':
      return node.body.map(codeGenerator)
        .join('\n');

    case 'ExpressionStatement':
      return (
        codeGenerator(node.expression) +
        ';' 
      );
    
    case 'CallExpression':
      return (
        codeGenerator(node.callee) +
        '(' +
        node.arguments.map(codeGenerator)
          .join(', ') +
        ')'
      );

    case 'Identifier':
    return node.name;
      // return node.name;で呼ばれたcodeGenerator(node.callee)にreturn
    
    case 'NumberLiteral':
      return node.value;
      // return node.value;で呼ばれたnode.arguments.map(codeGenerator)にreturn
    
    case 'StringLiteral':
      return '"' + node.value + '"';

    default:
      alert('正しい構文を入力してください');
      throw new TypeError(node.type);
  }
}
