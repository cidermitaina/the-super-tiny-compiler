import { traverser } from './3-traverser.js';

// 4-transformer.js

// 新しいastを作成する。
export function transformer(ast) {
  
  // Programを持つ newAstを作成
  let newAst = {
    type: 'Program',
    body:[],
  }

  ast._context = newAst.body;

  traverser(ast, {

     // 数字
     NumberLiteral: {
      enter(node, parent) {
        // parent contextにpush
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value,
        })
      }
    },

    // 文字列
    StringLiteral: {
      enter(node, parent) {
        // parent contextにpush
        parent._context.push({
          type: 'StringLiteral',
          value: node.value,
        });
      },
    },

    CallExpression: {
      enter(node, parent) {

        let expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name,
          },
          arguments: [],
        };

        node._context = expression.arguments;
        if (parent.type !== 'CallExpression') {
          expression = {
            type: 'ExpressionStatement',
            expression: expression,
          };
        }
        parent._context.push(expression);
      },
    }
  });
  return newAst;
}
