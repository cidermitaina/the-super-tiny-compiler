"use strict";
import { tokenizer } from './1-tokenizer.js';
import { parser } from './2-parser.js';
import { transformer } from './4-transformer.js';
import { codeGenerator } from './5-code-generator.js';

const button = document.getElementById('button');
const input = document.getElementById('input');
const text = document.getElementById('text');

button.addEventListener('click', function() {
  let inputValue = input.value.trim();
  
  let startStr = inputValue.slice( 0,1 ) ;
  let endStr = inputValue.slice( -1 ) ;

  if (startStr === '(' && endStr === ')'){
    let tokens = tokenizer(inputValue);
    let ast = parser(tokens);
    let newAst = transformer(ast);
    let output = codeGenerator(newAst);
    
    text.textContent = output;
  }else {
    alert('正しい構文を入力してください');
  }
});