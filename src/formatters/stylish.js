// Реализуйте форматер, выводящий внутреннее дерево как показано сверху. Назовите его stylish.
// К тебе должен в форматтер приходить АСТ. Представляй АСТ как сырой материал из которого ты уже будешь собирать вывод.

// В данном шаге формат вывода визуальный. Т.е. смотрим в объект и видим: что пришло, что ушло, а что изменилось или осталось неизменным. В следующем шаге вывод будет строиться на основе всё того же АСТ, но он - вывод - будет уже текстовым, а не визуальным.

// В подсказке про пример АСТ, если перейти по ссылке, будет вкладка Syntax. Она наиболее близко показывает суть ожидаемого.

// форматтер должен добавить табуляции в начала строк? Или фигурные скобки тоже?

// Да, всё верно. В выбранном форматтере финальной версией будет готовый, более не изменяемый, результат.
// если ключ был удалён, то у него не может быть детей.

// {
//     'key': key,
//     'same': значение, если ничего не менялось,
//     'deleted': значение, которое удалилось,
//     'added': значение, которое добавилось
//     'children': [если есть дети, они рекурсивно отображаются в массиве]
//     }
// И если значение ключа в обоих файлах объект, только тогда нужно запускать рекурсию.
// const stylish = (tree, space = '.', spacesCount = 7) => {
//     // console.log('CURRENT TREE', tree);
//     const indent = n => space.repeat(n * spacesCount);
//     const iter = (node, depth) => {
//       // console.log('CURRENT NODE', node);
//       const result = node.flatMap((item) => {
//         switch (item.status) {
//           case 'deleted':
//             return `${indent(depth)}- ${item.name}: ${item.value}`;
//           case 'added':
//             return `${indent(depth)}+ ${item.name}: ${item.value}`;
//           case 'nested':
//             return `${indent(depth)}  ${item.name}: {${iter(item.value, depth + 1)}${indent(depth)}  }`;
//           case 'modified':
//             return `${indent(depth)}- ${item.name}: ${item.value1}\n${indent(depth)}+ ${item.name}: ${item.value2}`;
//           case 'unchanged':
//             return `${indent(depth)}  ${item.name}: ${item.value}`;
//           default:
//             throw new Error(`Unknown type: '${item.status}'`);
//         }
//       });
//       return `\n${result.join('\n')}\n`;
//     };
//     return `{${iter(tree, 1)}}`;
//   };
