/*
                    Функция - конструктор
Функции - конструкторы являются обычными функциями.Но есть два соглашения:

Имя функции - конструктора должно начинаться с большой буквы.
Функция - конструктор должна вызываться при помощи оператора "new".

*/
function User(name) {
    this.name = name;
    this.isAdmin = false;
}

let user = new User("Вася");

alert(user.name); // Вася
alert(user.isAdmin); // false

/*
    Когда функция вызывается как new User(...), происходит следующее:

Создаётся новый пустой объект, и он присваивается this.
Выполняется код функции.Обычно он модифицирует this, добавляет туда новые свойства.
Возвращается значение this.
Другими словами, вызов new User(...) делает примерно вот что:
*/

function User(name) {
    // this = {};  (неявно)

    // добавляет свойства к this
    this.name = name;
    this.isAdmin = false;

    // return this;  (неявно)
}

//То есть, результат вызова new User("Вася") – это тот же объект, что и:

let user = {
    name: "Вася",
    isAdmin: false
};

/*
Используя специальное свойство new.target внутри функции, мы можем проверить, 
вызвана ли функция при помощи оператора new или без него.

В случае, если функция вызвана при помощи new, то в new.target будет сама функция, 
в противном случае undefined.
*/

function User() {
    alert(new.target);
}

// без "new":
User(); // undefined

// с "new":
new User(); // function User { ... }

// Это можно использовать, чтобы отличить обычный вызов от вызова «в режиме конструктора».
// В частности, вот так можно сделать, чтобы функцию можно было вызывать как с, так и без new:

function User(name) {
    if (!new.target) { // в случае, если вы вызвали без оператора new
        return new User(name); // ...добавим оператор new за вас
    }

    this.name = name;
}

let vasya = User("Вася"); // переадресовывает вызовы на new User
alert(vasya.name); // Вася

/*
Возврат значения из конструктора return
Обычно конструкторы ничего не возвращают явно.Их задача – записать все необходимое в this, 
который в итоге станет результатом.

Но если return всё же есть, то применяется простое правило:

При вызове return с объектом, будет возвращён объект, а не this.
При вызове return с примитивным значением, примитивное значение будет отброшено.
Другими словами, return с объектом возвращает объект, в любом другом случае конструктор вернёт this.

В примере ниже return возвращает объект вместо this:
*/

function BigUser() {
    this.name = "Вася";
    return { name: "Godzilla" };  // <-- возвращает этот объект
}

alert(new BigUser().name);  // Godzilla, получили этот объект

// А вот пример с пустым return (или мы могли бы поставить примитив после return, неважно)

function SmallUser() {
    this.name = "Вася";
    return; // <-- возвращает this
}

alert(new SmallUser().name);  // Вася
// Обычно у конструкторов отсутствует return.В данном блоке мы упомянули особое поведение с 
// возвращаемыми объектами, чтобы не оставлять пробелов в изучении языка.

// Отсутствие скобок
// Кстати, мы можем не ставить скобки после new, если вызов конструктора идёт без аргументов.

let user = new User; // <-- без скобок
// то же, что и
let user = new User();