"use strict";
import { tokenizer } from './1-tokenizer.js';
import { parser } from './2-parser.js';
import { transformer } from './4-transformer.js';
import { codeGenerator } from './5-code-generator.js';

const button = document.getElementById('button');
const input = document.getElementById('input');
const output = document.getElementById('output');

button.addEventListener('click', function() {
  const inputValue = input.value.trim();
  
  // '('で始まり、')'で終わるか確認
  const inputValueRegex = /^\(.*\)$/;

  if (inputValueRegex.test(inputValue)){
    let tokens = tokenizer(inputValue);
    let ast = parser(tokens);
    let newAst = transformer(ast);
    let outputValue = codeGenerator(newAst);
    
    output.textContent = outputValue;
  }else {
    alert('正しい構文を入力してください');
  }
});
