/*

  Напишите функцию mapArrayToHashByKey. Она принимает два аргумента -- массив объектов array и строку key.

*/

/*

  А возвращает объект со структурой:

{
 array[0][key]: array[0],
 array[1][key]: array[2],
....
_${key}s: [array[0][key], array[1][key], ... ]
}

*/
const mapArrayToHashByKey = (data, key) => {
  const result = {};
  result[`_${key}s`] = [];

  if (data[0][key] !== undefined)
    for (el of data) {
      const strKey = typeof el[key] === 'object' ? JSON.stringify(el[key]) : String(el[key])

      if (typeof result[strKey] !== "undefined") {
        if (Array.isArray(result[strKey]))
          result[strKey].push(el);
        else
          result[strKey] = [result[strKey], el];
      } else {
        result[strKey] = el;
      }

      if (result[`_${key}s`].indexOf(strKey) === -1) result[`_${key}s`].push(strKey);
    }

  return result;
}


const data = [
  {
    id: 1,
    age: 25,
    address: {
      city: "New York",
      zipCode: 10001,
    },
    name: "John",
    surname: "Doe",
  },
  {
    id: 2,
    age: 30,
    address: {
      city: "Los Angeles",
      zipCode: 90001,
    },
    name: "Jane",
    surname: "Smith",
  },
  {
    id: 3,
    age: 30,
    address: {
      city: "Los Angeles",
      zipCode: 90001,
    },
    name: "Nnn",
    surname: "asd",
  },
];

const hash = mapArrayToHashByKey(data, "age");
console.log(hash);
/*
  Пример результата функции:

{
  "25": {
    id: 1,
    age: 25,
    address: {
      city: "New York",
      "zipCode": 10001
    },
    name: "John",
    surname: "Doe"
  },
  "30": {
    id: 2,
    age: 30,
    address: {
      city: "Los Angeles",
      zipCode: 90001
    },
    name: "Jane",
    surname: "Smith"
  },
  "_ages": [
    "25",
    "30"
  ]
}

  Ограничения и гарантии:
    - гарантируется, что значения ключей объектов в массиве array (и вложенных объектов) имеют только следующие типы данных:
      + string;
      + number;
      + null;
      + undefined;
      + boolean;
    - рекомендуемая временная сложность функции -- O(n).
    - параметр array может принимать значения null или undefined - в этом случае выполнение функции не должно завершиться ошибкой.
    - если аргумента key нет среди ключей объектов массива array - функция должна вернуть структуру вида:

{
  _${key}s: [];
}
*/