/*
TASK 1 🚀
// in your own words explain what a closure is below in comments and then write an example of a closure. Try to make this explaination simple enough to explain to a younger sibling. */

/*A closure is a function inside of another function. The function inside of the other function still as access to the outter function variables, even after the outter function as be returned*/

let add = ( function () {
  let counter = 0;
  return function () {
    counter += 1;
    return counter;
  }
} )();

console.log( add() );
console.log( add() );
console.log( add() );
console.log( add() );

/*
TASK 2 🚀
// look at the code below and explain in your own words where the variable 'count' is available.
// Explain why 'count' is initialized with a let and not a var or const.
// Explain how initalizing the variable 'count' with a var would change it's scope
*/
function counterMaker() {
    let count = 0;
    return function counter() {
     return count++;
    }
}

/*1. The variable 'count is available only after the the fuction counterMaker is called.
  2. 'count' is initialized with let because we want to restrict its access to the function counterMaker. That way it can only be changed through a call to the function. Also, const isn't used because a const variable can not be changed after it is initialized.
  3. We didn't use var because that would have made the var a gobal scope variable. Meaning that any where in the code we could aceess the varable contents and change it.*/

/*
TASK 3 🚀
* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. Window/Global Object Binding When in the global scope 'this' will be the window/console Object.
* 2. Implict Binding whenever a dot calls a function the object being refered to is left of the dot.
* 3. New Binding whenever a constructor function is used, 'this' refers to the specific instance of the object that is created.
* 4. Explicit binding Whenever the call or apply method is used, 'this' is sxplicitly defined.
*
* write out a code example of each explanation above
*/

// Principle 1

function player(name){
  console.log( this );
  return name;
}
player( "Justin" );

// Principle 2

const players = {
  weapon: 'Sword',
  player: function ( name ) {
    console.log( `${ this.weapon } is the weapon ${ name } likes to use` );
    console.log( this );
  }
};
players.player( 'Justin' );
// Principle 3

function person( thePlayer ) {
  this.isCarring = 'Sword';
  this.thePlayer = thePlayer;
  this.speak = function () {
    console.log( `${ this.thePlayer } is carring a ${ this.isCarring }` );
    console.log( this );
  };
}
const justin = new person( 'Justin' );
justin.speak();
const brittany = new person( 'Brittany' );
brittany.speak();

// Principle 4

justin.speak.call( brittany );
brittany.speak.call( justin );

/*
TASK 4 🚀
/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.
  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.
  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.

  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/
function GameObject(attr) {
  this.createdAt = attr.createdAt;
  this.name = attr.name;
  this.dimensions = attr.dimensions;
}

GameObject.prototype.destroy = function () {
  return  `${ this.name } was removed from the game.` ;
}
/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats( attr ) {
  GameObject.call( this, attr );
  this.healthPoints = attr.healthPoints;
}

CharacterStats.prototype = Object.create( GameObject.prototype );

CharacterStats.prototype.takeDamage = function () {
  return `${ this.name } took damage`;
}
/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
function Humanoid( attr) {
  CharacterStats.call( this, attr );
  this.team = attr.team;
  this.weapons = attr.weapons;
  this.language = attr.language;
}

Humanoid.prototype = Object.create( CharacterStats.prototype );
Humanoid.prototype.greet = function () {
   return `${this.name} offers a greeting in ${this,this.language}`;
}

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:



  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.



/*
TASK 5 🚀
// convert the constructor functions above to class syntax copy and paste the objects and console logs below the class syntax to test if your code is working
 */

class GameObject{
  constructor ( attr ) {
  this.createdAt = attr.createdAt;
  this.name = attr.name;
  this.dimensions = attr.dimensions;
  }
   destroy() {
     return  `${ this.name } was removed from the game.` ;
   }
}

class CharacterStats extends GameObject{
  constructor ( attr ) {
    super( attr );
    this.healthPoints = attr.healthPoints;
  }
   takeDamage() {
      return  `${ this.name } took damage`;
    }
}

class Humanoid extends CharacterStats{
  constructor ( attr ) {
    super( attr );
    this.team = attr.team;
    this.weapons = attr.weapons;
    this.language = attr.language;
  }
  greet() {
      return `${this.name} offers a greeting in ${this,this.language}`;
    }
}

const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });
  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });
  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });
  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.
