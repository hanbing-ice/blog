

总结自js红宝书第六章
---
title: 条件类型
author: 冴羽
date: '2021-12-12'
---
# 理解对象
创建自定义对象的最简单方式就是创建一个 Object 的实例，然后再为它添加属性和方法

```javascript
var person = new Object(); 
person.name = "Nicholas"; 
person.age = 29; 
person.job = "Software Engineer"; 
person.sayName = function(){ 
 alert(this.name); 
};
```
或者采用对象字面量的方法

```javascript
var person = { 
 name: "Nicholas", 
 age: 29, 
 job: "Software Engineer", 
 sayName: function(){ 
 alert(this.name); 
 } 
};
```
这两种方法所创建的对象是一样的，相同的属性和方法，下面对所创建的对象的属性进行研究：

### 数据属性
-  [[Configurable]]：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true。
-  [[Enumerable]]：表示能否通过 for-in 循环返回属性。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true。
-  [[Writable]]：表示能否修改属性的值。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true。 
-  [[Value]]：包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。这个特性的默认值为 undefined。

采用object.defineProperty/object.defineProperties
### 访问器属性
访问器属性不包含数据值，包含一对儿getter和setter函数；访问器属性不能直接定义，必须使用 Object.defineProperty()来定义


-  [[Configurable]]：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为数据属性。对于直接在对象上定义的属性，这个特性的默认值为
true。
-  [[Enumerable]]：表示能否通过 for-in 循环返回属性。对于直接在对象上定义的属性，这个特性的默认值为 true。
- [[Get]]：在读取属性时调用的函数。默认值为 undefined。 
 - [[Set]]：在写入属性时调用的函数。默认值为 undefined。

# 创建对象
开头的**Object 构造函数**或**对象字面量**都可以用来创建单个对象，但这些方式有个明显的缺点：使用同一个接口创建很多对象，会产生大量的重复代码。

下面就是讲一些关于创建对象的模式：
### 1、工厂模式
一种函数，用函数来封装以特定接口创建对象的细节，

```javascript
function createPerson(name, age, job){ 
 var o = new Object(); 
 o.name = name; 
 o.age = age; 
 o.job = job; 
 o.sayName = function(){ 
 alert(this.name); 
 }; 
 return o; 
} 
var person1 = createPerson("Nicholas", 29, "Software Engineer"); 
var person2 = createPerson("Greg", 27, "Doctor");
```
工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型）

### 2、构造函数模式
像 Object 和 Array 这样，的原生构造函数，在运行时会自动出现在执行环境中此外，也可以创建自定义的构造函数，从而定义
自定义对象类型的属性和方法。

```javascript
 this.name = name; 
 this.age = age; 
 this.job = job; 
 this.sayName = function(){ 
 alert(this.name); 
 }; 
} 
var person1 = new Person("Nicholas", 29, "Software Engineer"); 
var person2 = new Person("Greg", 27, "Doctor");
```

Person()函数取代了工厂模式中的 createPerson()函数。我们注意到，Person()中的代码除了与 createPerson()中相同的部分外，还存在以下不同之处：
-  没有显式地创建对象；
-  直接将属性和方法赋给了 this 对象；
-  没有 return 语句。

**要创建 Person 的新实例，必须使用 new 操作符。**

new一个对象有四步

 1. 创建一个新对象
 2. 将构造函数的作用域指向新对象（this就指向新对象）
 3. 执行构造函数的内容（给新对象绑定属性）
 4. 返回新对象

任何函数，只要通过 new 操作符来调用，那它就可以作为构造函数；


但也并非没有缺点。使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍。在前面的例子中，person1 和 person2 都有一个名为 sayName()的方法，但那两个方法不是同一个 Function 的实例。不要忘了——ECMAScript 中的函数是对象，因此每定义一个函数，也就是实例化了一个对象。

### 3、原型模式
创建的每个函数都有一个 prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象（称为原型对象）的用途是包含可以由特定类型的所有实例共享的属性和方法。


使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。

换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中。

```javascript
} 
Person.prototype.name = "Nicholas"; 
Person.prototype.age = 29; 
Person.prototype.job = "Software Engineer"; 
Person.prototype.sayName = function(){ 
 alert(this.name); 
}; 
var person1 = new Person(); 
person1.sayName(); //"Nicholas" 
var person2 = new Person();
person2.sayName(); //"Nicholas" 
alert(person1.sayName == person2.sayName); //true
```
在此，我们将 sayName()方法和所有属性直接添加到了 Person的 prototype 属性中，构造函数变成了空函数。


构造函数模式不同的是，新对象的这些属性和方法是由所有实例共享的。

#### 理解原型对象
无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个 prototype属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个 constructor（构造函数）属性，这个属性包含一个指向 prototype 属性所在函数的指针
![请添加图片描述](https://img-blog.csdnimg.cn/0cf8fb8737854822b1b1aa311f617db6.png)右上角的就是原型对象。

通过对象实例访问保存在原型中的值，但却不能通过对象实例重写原型中的值，如果在实例中添加了一个属性，而该属性与实例原型中的一个属性同名，那我们就在实例中创建该属性，该
属性将会屏蔽原型中的那个属性。



- 虽然在所有实现中都无法访问到[[Prototype]]，但可以通过 isPrototypeOf()方法来确定对象之
间是否存在这种关系。从本质上讲，如果[[Prototype]]指向调用 isPrototypeOf()方法的对象
（Person.prototype），那么这个方法就返回 true，如下所示：
- in 操作符会在通过对象能够访问给定属性时返回 true，无论该属性存在于实例中还是原型中。

- hasOwnProperty()只在属性存在于
实例中时才返回 true，


- 在使用 for-in 循环时，返回的是所有能够通过对象访问的、可枚举的（enumerated）属性，其中
既包括存在于实例中的属性，也包括存在于原型中的属性。屏蔽了原型中不可枚举属性（即将
[[Enumerable]]标记为 false 的属性）的实例属性也会在 for-in 循环中返回，因为根据规定，所
有开发人员定义的属性都是可枚举的——只有在 IE8 及更早版本中例外。

- 要取得对象上所有可枚举的实例属性，可以使用 ECMAScript 5 的 Object.keys()方法。

原型中所有属性是被很多实例共享的，这种共享对于函数非常合适。对于那些包含基本值的属性倒也说得过去，毕竟（如前面的例子所示），通过在实例上添加一个同名属性，可以隐藏原型中的对应属性。然而，对于包含引用类型值的属性来说，问题就比较突出了。

### 4、组合使用构造函数模式和原型模式
创建自定义类型的最常见方式，就是组合使用构造函数模式与原型模式。

构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存。另外，这种混成模式还支持向构造函数传递参
数；可谓是集两种模式之长

```javascript
function Person(name, age, job){ 
 this.name = name; 
 this.age = age; 
 this.job = job; 
 this.friends = ["Shelby", "Court"]; 
} 
Person.prototype = { 
 constructor : Person, 
 sayName : function(){ 
 alert(this.name); 
 } 
} 
var person1 = new Person("Nicholas", 29, "Software Engineer"); 
var person2 = new Person("Greg", 27, "Doctor"); 
person1.friends.push("Van"); 
alert(person1.friends); //"Shelby,Count,Van" 
alert(person2.friends); //"Shelby,Count" 
alert(person1.friends === person2.friends); //false 
alert(person1.sayName === person2.sayName); //true
```

###  5、动态原型模式
注意构造函数代码中加粗的部分。这里只在 sayName()方法不存在的情况下，才会将它添加到原型中。这段代码只会在初次调用构造函数时才会执行。此后，原型已经完成初始化，不需要再做什么修改了。

```javascript
function Person(name, age, job){ 
 //属性
 this.name = name; 
 this.age = age; 
 this.job = job;
 //方法
 if (typeof this.sayName != "function"){ 
 Person.prototype.sayName = function(){ 
 alert(this.name); 
 }; 
 } 
} 
var friend = new Person("Nicholas", 29, "Software Engineer"); 
friend.sayName();
```

### 6、寄生构造函数模式
通常，在前述的几种模式都不适用的情况下，可以使用寄生（parasitic）构造函数模式。这种模式的基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象；但从表面上看，这个函数又很像是典型的构造函数。

```javascript
function Person(name, age, job){ 
 var o = new Object(); 
 o.name = name; 
 o.age = age; 
 o.job = job; 
 o.sayName = function(){ 
 alert(this.name); 
 }; 
 return o; 
} 
var friend = new Person("Nicholas", 29, "Software Engineer"); 
friend.sayName(); //"Nicholas"
```

### 7、稳妥构造函数模式
稳妥构造函数遵循与寄生构造函数类似的模式，但有两点不同：一是新创建对象的
实例方法不引用 this；二是不使用 new 操作符调用构造函数。按照稳妥构造函数的要求，可以将前面的 Person 构造函数重写如下。

```javascript
function Person(name, age, job){ 
 //创建要返回的对象
 var o = new Object();
 //可以在这里定义私有变量和函数
 //添加方法
 o.sayName = function(){ 
 alert(name); 
 }; 
 //返回对象
 return o; 
}
```

# 继承
ECMAScript 只支持实现继承，而且其实现继承主要是依靠原型链
来实现的。

### 确定原型和实例的关系
- 第一种方式是使用 instanceof 操作符，只要用这个操作符来测试实例与原型链中出现过的构造函数，结果就会返回 true。

```javascript
alert(instance instanceof Object); //true 
alert(instance instanceof SuperType); //true 
alert(instance instanceof SubType); //true
```
- 第二种方式是使用 isPrototypeOf()方法。同样，只要是原型链中出现过的原型，都可以说是该原型链所派生的实例的原型，因此 isPrototypeOf()方法也会返回 true，如下所示。

```javascript
alert(Object.prototype.isPrototypeOf(instance)); //true 
alert(SuperType.prototype.isPrototypeOf(instance)); //true 
alert(SubType.prototype.isPrototypeOf(instance)); //true
```

原型式继承，可以在不必预先定义构造函数的情况下实现继承，其本质是执行对给定对象的浅复制。而复制得到的副本还可以得到进一步改造。


寄生式继承，与原型式继承非常相似，也是基于某个对象或某些信息创建一个对象，然后增强对象，最后返回对象。为了解决组合继承模式由于多次调用超类型构造函数而导致的低效率问题，可以将这个模式与组合继承一起使用。

寄生组合式继承，集寄生式继承和组合继承的优点与一身，是实现基于类型继承的最有效方式。

