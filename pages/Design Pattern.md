- #javascript
- {{renderer :tocgen}}
-
- [Design Pattern in Javascript](https://dev.to/twinfred/design-patterns-in-javascript-1l2l)
  講述怎麼在 JS 實作 設計模式
- # Factory Pattern
	- 定義 interface 來創造 Object，不過是子類別決定是哪個 class 會建立 Object
	  ```js
	  function animalFactory() {
	    this.createAnimal = function(animalType) {
	      let animal;
	  
	      switch(animalType) {
	        case 'dog':
	          animal = new Dog();
	          break;
	        case 'cat':
	          animal = new Cat();
	          break;
	        default:
	          animal = new Monkey();
	          break;
	      }
	  
	      return animal;
	    }
	  }
	  
	  const Dog = function() {
	    this.makeSound = () => {
	      console.log('woof woof!');
	    }
	  }
	  
	  const Cat = function() {
	    this.makeSound = () => {
	      console.log('prrr prrr meow!');
	    }
	  }
	  
	  const Monkey = function() {
	    this.makeSound = () => {
	      console.log('ooooh ahh oooh oooh!');
	    }
	  }
	  
	  const factory = new animalFactory();
	  
	  const jojo = factory.createAnimal('dog');
	  jojo.makeSound();
	  
	  const smokey = factory.createAnimal('cat');
	  smokey.makeSound();
	  
	  const kong = factory.createAnimal('monkey');
	  kong.makeSound();
	  ```
- # Prototype Pattern
	- 支援 "cloning" 的 Object 被稱作 prototype
	  我們可以用一個已經存在的 Object 做為 template ，透過 cloning 來建立新的 Object
	  Prototype pattern 以 JS 的特性 prototypal inheritance 作為基礎
	-
	- 不過要注意，被複製出來的物件印出來會是空物件，它是透過原型鍊來呼叫到屬性及函式
	  ```js
	  const macBook = {
	  color: 'silver',
	  turnOn() {
	    console.log('turning on...');
	  },
	  turnOff() {
	    console.log('turning off...');
	  }
	  }
	  
	  // Proper prototype cloning
	  const myComputer = Object.create(macBook, { owner: { value: 'Tim'} });
	  console.log(myComputer.__proto__ === macBook); // true
	  
	  // Not a prototype copy
	  const newComputer = {...macBook, owner: 'John'};
	  console.log(newComputer.__proto__ === macBook); // false
	  
	  macBook.power = 'USB-C';
	  
	  // The protoype gets the new value for 'power'
	  console.log(myComputer.power);
	  // But the non-prototype doesn't
	  console.log(newComputer.power);
	  
	  myComputer.color = 'red';
	  
	  console.log(macBook);
	  /*
	  {
	  color: 'silver',
	  turnOn: [Function: turnOn],
	  turnOff: [Function: turnOff],
	  power: 'USB-C'
	  }
	  */
	  console.log(myComputer);
	  // { color: 'red' }
	  ```
- # Singleton Pattern
	- 確保 class 只有一個 instance，且確定有個 global point 可以存取到這個 instance
	  ```js
	  const Database = (function () {
	  let instance;
	  
	  function createDatabaseInstance() {
	    return new Object('Database Instance');
	  }
	  
	  function getDatabaseInstance() {
	    if (!instance) {
	      instance = createDatabaseInstance();
	    }
	  
	    return instance;
	  }
	  
	  return { getDatabaseInstance }
	  })();
	  
	  const databaseInstance1 = Database.getDatabaseInstance();
	  const databaseInstance2 = Database.getDatabaseInstance();
	  
	  console.log(databaseInstance1 === databaseInstance2);
	  ```
- # Adapter Pattern / Warpper Pattern
	- 轉換 class 的 interfacet，使得原本不能在一起使用的 classes 可以一起使用
	  ```js
	  function TicketPrice() {
	    this.request = function(start, end, overweightLuggage) {
	        // price calculation code...
	        return "$150.34";
	    }
	  }
	  
	  // new interface
	  function NewTicketPrice() {
	    this.login = function(credentials) { /* process credentials */ };
	    this.setStart = function(start) { /* set start point */ };
	    this.setDestination = function(destination) { /* set destination */ };
	    this.calculate = function(overweightLuggage) { 
	        //price calculation code...
	        return "$120.20"; 
	    };
	  }
	  
	  // adapter interface
	  function TicketAdapter(credentials) {
	    var pricing = new NewTicketPrice();
	  
	    pricing.login(credentials);
	  
	    return {
	        request: function(start, end, overweightLuggage) {
	            pricing.setStart(start);
	            pricing.setDestination(end);
	            return pricing.calculate(overweightLuggage);
	        }
	    };
	  }
	  
	  var pricing = new TicketPrice();
	  var credentials = { token: "30a8-6ee1" };
	  var adapter = new TicketAdapter(credentials);
	  
	  // original ticket pricing and interface
	  var price = pricing.request("Bern", "London", 20);
	  console.log("Old price: " + price);
	  
	  // new ticket pricing with adapted interface
	  price = adapter.request("Bern", "London", 20);
	  console.log("New price: " + price);
	  ```