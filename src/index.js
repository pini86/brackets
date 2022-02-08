module.exports = function check(str, bracketsConfig) {
     const open = new Set(bracketsConfig.map(pair => pair[0]));//открывающие скобки
     const close  = new Set(bracketsConfig.map(pair => pair[1]));//закрывающие скобки
     const relevant = bracketsConfig.reduce((acc, [open, close]) => ({...acc, [close]: open}), {});//массив соответствия закрывающей и открывающей
     let stack = [];
     for (let char of str) {
       let topElem = stack[stack.length-1];//смотрим что на вершине стека, не снимая её
       if (open.has(char) && close.has(char)) {//проверка : если открывающая = закрывающей
         if (topElem === char){                 //если на вершине стека такая-же скобка
          if (relevant[char] !== stack.pop()) return false;// то пробуем снимать и проверяем соответствие скобок
         } else {
          stack.push(char);  //иначе , кладем в стек
         }
       }
       if (open.has(char) && !close.has(char)) {//проверка : только открывающая скобка
         stack.push(char);                    //кладем в стек
       }
       if (close.has(char) && !open.has(char)) {  //проверка : только закрывающая скобка
         if (relevant[char] !== stack.pop()) return false; // снимаем верхушку стека и проверяем соответствие скобок
       }
     }
     return stack.length === 0; //осталось чего-нибудь в стеке
}
