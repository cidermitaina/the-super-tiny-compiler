"use strict";
import { tokenizer } from './1-tokenizer.js';
import { parser } from './2-parser.js';
import { transformer } from './4-transformer.js';
import { codeGenerator } from './5-code-generator.js';

const button = document.getElementById('button');
const inputSyntax = document.getElementById('inputSyntax');
const outputSyntax = document.getElementById('outputSyntax');

button.addEventListener('click', function() {
  const inputValue = inputSyntax.value.trim();
  
  // '('で始まり、')'で終わるか確認
  const inputValueRegex = /^\(.*\)$/;

  if (inputValueRegex.test(inputValue)){
    let tokens = tokenizer(inputValue);
    let ast = parser(tokens);
    let newAst = transformer(ast);
    let output = codeGenerator(newAst);
    
    outputSyntax.textContent = output;
  }else {
    alert('正しい構文を入力してください');
  }
});
