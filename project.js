"use strict";

//PROJECT:
//Let's imitate online shop process: user registration, looking for items and a shopping cart
// Shop type: paints

/* ******************************************************************************************************** */
//STEP 1. Let's create a class for a user registration
/* ******************************************************************************************************** */

class User {
  // Field
  #password;
  #confirmPassword;

  constructor(fName, lName, email) {
    this.firstName = typeof fName == "string" ? fName : "unknown";
    this.lastName = typeof lName == "string" ? lName : "unknown";
    this.email = typeof email == "string" ? email : "unknown";
    this.#password;
    this.#confirmPassword;
  }

  //1. Allow for the random generation of password:
  // reference link: https://www.geeksforgeeks.org/how-to-generate-a-random-password-using-javascript/
  generatePassword() {
    let generatedPassword = "";
    let charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numberSet = "0123456789";
    /* special character string */
    let specialChar = "!@#$+-*&_";
    /* NICE ONE: determine the position of the special character */
    let s = specialChar.length - 3;
    let n = numberSet.length - 6;

    for (let i = 1; i <= 8; i++) {
      if (s == i) {
        /* special character insertion */
        generatedPassword += specialChar.charAt(
          Math.floor(Math.random() * specialChar.length)
        );
        /* number insertion */
      } else if (n == i) {
        generatedPassword += numberSet.charAt(Math.random() * numberSet.length);
      } else {
        generatedPassword += charSet.charAt(Math.random() * charSet.length);
      }
    }
    /* you can add the rule that random password should always have a number*/

    return `The password was generated: ${generatedPassword}. If you want to set your password, click on change my password.`;
  }

  // 2. Store generated password in the object:
  // Don't update password inside generatePassword() method (!) above: password will change everytime this method is called
  updatePassword(newPassword) {
    this.#password = newPassword;
    return `Your password was updated: ${newPassword}`;
  }

  // 3. Make sure password and confirmPassword match:
  confirmUserPassword(value) {
    this.#confirmPassword = value.toString();

    let password1 = this.#password;
    let password2 = this.#confirmPassword;

    /* If password not entered */
    if (typeof password1 === "undefined") return `Please enter your password`;
    // instead of 'typeof password1 === "undefined"': 'password1 = undefined' would work, too
    /* If confirm password not entered */ else if (
      typeof password2 === "undefined"
    )
      return "Please enter your password to confirm";
    /* If not the same  > return False */ else if (password1 != password2)
      return `Password did not match: Please try again...`;
    // If same > return True.
    else {
      return "Password Match passed";
    }
  }

  // resetPassword() {
  //   this.#password = undefined;
  // }

  // 4. If generated password not used, let user create her own password and validate it:
  // links reference: https://stackoverflow.com/questions/24055785/add-conditions-to-password-validation-javascript
  // https://www.tutorialspoint.com/set-pin-validation-with-javascript
  createOwnPassword = (passwordValue) => {
    /* create separate variables to pass validation with regex: */
    //you can also put them all in one variable
    let numbers = /[0-9]/g;
    let lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let specialCharacters = /[^A-Za-z0-9]/g;
    let passwordV2 = passwordValue.toString();

    /* We use NESTED IF STATEMENTS to achieve the result of popup messages */
    // We coulld have also created separate methods for each validation. e.g. upperCaseCheck(), etc.
    // Lines 101- 105 may be simply deleted
    if (
      passwordV2.length >= 8 ||
      lowerCaseLetters.test(passwordV2) ||
      upperCaseLetters.test(passwordV2) ||
      numbers.test(passwordV2) ||
      specialCharacters.test(passwordV2)
    ) {
      if (passwordV2.length < 8) {
        return `Please make sure password is 8 characters or longer.`;
      }

      if (!lowerCaseLetters.test(passwordV2)) {
        return `Please make sure password contains lower case letters.`;
      }

      if (!upperCaseLetters.test(passwordV2)) {
        return `Please make sure password contains upper case letters.`;
      }

      if (!numbers.test(passwordV2)) {
        return `Please make sure password contains numbers.`;
      }

      if (!specialCharacters.test(passwordV2)) {
        return `Please make sure password contains special characters.`;
      }
    }
    this.#password = passwordV2;
    return `Your password was updated: ${passwordV2}`;

    //#region USING LOOP
    // Using for loop for returning seperate messages on every validation (and not to simply return one true or false)
    // turned to be not optimal
    // But I will keep this code as a reminder.

    // for (i = 0; i <= password.length; i++) {

    //   if (
    //     //!upperCaseLetters.test(password[i]) &&
    //     lowerCaseLetters.test(password[i])
    //   ) {
    //     passwordTrue = true;
    //     console.log(passwordTrue); //returns false
    //   }

    // if (passwordTrue == true) {
    //   return true;
    // } else {
    //   return false;
    // }
    //#endregion
  };

  // 5. Now, use this function to display the password strength
  // reference link: https://www.section.io/engineering-education/password-strength-checker-javascript/
  assignPasswordStrength() {
    /* Here we practice regex conditions applied in one variable */
    // The password has at least one uppercase letter (?=.*[A-Z]).
    // The password has at least one lowercase letter (?=.*[a-z]).
    // The password has at least one digit (?=.*[0-9]).
    // The password has at least one special character ([^A-Za-z0-9]). //i.e. match every character which is not A-Z,a-z,0-9
    // The password is at least 8 characters long (?=.{8,}).

    let strongPassword =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/g;
    let mediumPassword =
      /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/g;
    /* create an empty object to store strengthBadge and strengthBadgeText */
    let passwordObject = {};

    if (strongPassword.test(this.#password)) {
      passwordObject.strengthBadge = "green";
      passwordObject.strengthBadgeText = "Strong";
      return passwordObject;
    } else if (mediumPassword.test(this.#password)) {
      passwordObject.strengthBadge = "blue";
      passwordObject.strengthBadgeText = "Medium";
      return passwordObject;
    } else {
      passwordObject.strengthBadge = "red";
      passwordObject.strengthBadgeText = "Weak";
      return passwordObject;
    }
  }

  // 6. Do email validation with regex
  // reference: // link reference: https://stackoverflow.com/questions/24055785/add-conditions-to-password-validation-javascript
  checkEmail() {
    let filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(this.email)) {
      return `Please provide a valid email address`;
    }

    return `All good with your email. Thanks.`;
  }
}

let user1 = new User("Keila", "Wendel", "keila.wendel@gmail.com");

console.log(`\n`);
console.log(`-----1. User Profile & Password Validation-----`);
console.log(user1.generatePassword());
console.log(user1.updatePassword("lVFPR!Ks"));
console.log(user1.confirmUserPassword("123456"));
console.log(user1.confirmUserPassword("lVFPR!Ks"));
console.log(user1.assignPasswordStrength());
console.log(user1.createOwnPassword(1234));
console.log(user1.createOwnPassword("12345"));
console.log(user1.createOwnPassword("1b345bbb"));
console.log(user1.createOwnPassword("1b345bBb"));
console.log(user1.createOwnPassword("1b34!bBb"));
//console.log(user1.password); //undefined >>> private property
console.log(user1.checkEmail());
console.log(user1);

/* ******************************************************************************************************** */
//STEP 2. Let's create a class for each item
/* ******************************************************************************************************** */

class Item {
  // Field

  constructor(iName, p1L, p5L, color, collection, sType, fType) {
    this.itemName = iName;
    this.price1L = p1L;
    this.price5L = p5L;
    this.color = color; // we can use this later to filter paints by color
    this.collection = collection; // we can use this later to filter paints by collection
    this.finishType = fType;
    this.surfaceType = sType;
    this.amount = 0;
    this.amountOfPaint = 0;
  }

  // 1. Choose room size to know how much paint you will roughly need:
  chooseRoomSize = (roomSizeValue) => {
    let roomSize = {
      small: "up to 22sq.m.",
      medium: "up to 32sq.m",
      large: "up to 42sq.m",
    };

    // if you want to refer only the key, do:
    if (roomSizeValue === Object.keys(roomSize)[0]) {
      return `WE THINK YOU WILL NEED \n5 Litres of ${this.finishType} paint`;
      // or, simply look if the value exists:
    } else if (roomSizeValue in roomSize) {
      return `WE THINK YOU WILL NEED \n7 Litres of ${this.finishType} paint`;
    } else if (roomSizeValue in roomSize) {
      return `WE THINK YOU WILL NEED \n9 Litres of ${this.finishType} paint`;
      // think of returning here the paint type the use chose
    }

    //TODO: add a timeout to console.log "Now, go back to the product view to calculate the exact amount of paint for your room dimensions."
  };

  // 2. Calculate paint amount based on surface:
  calculatePaintAmount(surface) {
    // we need 1 liter of paint for each 5 sq.m
    let numberOfLiters = surface / 5;
    this.amountOfPaint = numberOfLiters;

    return `You will need ${numberOfLiters} litres, to paint the surface of ${surface} sq.m.`;
  }

  // 3. Or, calculate paint amount based on length and width:
  calculateRoomSurface(length, width) {
    let surfaceDetector = length * width;
    let numberOfLitersV2 = surfaceDetector / 5;
    this.amountOfPaint = numberOfLitersV2;
    return `You will need ${numberOfLitersV2} litres to paint your surface.`;
  }

  // 4. Calculate paint amount for double layer:
  calculateRoomSurfaceforDoubleLayer(surface) {
    let numberOfLitersforDoubleLayer = (surface / 5) * 2;
    this.amountOfPaint = numberOfLitersforDoubleLayer;
    return `You will need ${numberOfLitersforDoubleLayer} liters, to paint the surface of ${surface} sq.m. 2 times`;
  }

  // Note: to make it more advanced, create a condition for the methods above that for a matt finish you need 15% more paint
  // 5. Define total amount (cost) based on this.amountofPaint calculated with the help of above methods:
  totalAmount() {
    this.amount = this.amountOfPaint * this.price1L;
    return `Total amount for the selected paint quantity is €${this.amount}.`;
  }

  // 6. Or, define total amount based on the price for 1L:
  totalAmountV2(number) {
    this.amount = this.price1L * number;
    return `Total amount for the selected paint quantity is €${this.amount}`;
  }

  // 7. Or, define total amount based on the price for 5L:
  totalAmountV3(number) {
    this.amount = this.price5L * number;
    return `Total amount for the selected paint quantity is €${this.amount}`;
  }
}

//#region EXTRA TO FINISH LATER
// you can also create two methods with 'dropdown' objects to set finishType and surfaceType:
// this.finish = {
//   f1: {fType: "matt", selected: false}; ,
//   f2: "absolute matt",
//   f3: "glossy",
//   f4: "glossy",
// };
// this.type = {
//   t1: "for walls and ceilings",
//   t2: "for metal and wood",
// };
//#endregion

/* ******************************************************************************************************** */
//STEP 2. Let's create items
/* ******************************************************************************************************** */
console.log(`\n`);
console.log(`-----2. Let's create items-----`);
console.log(`-----item1-----`);
let i1 = new Item(
  "50S MAGNOLIA",
  48.9,
  158.41,
  "rose",
  "colors of England",
  "floors and ceilings",
  "matt"
);
console.log(`-----choose Room Size as a helper-----`);
console.log(i1.chooseRoomSize("small"));
console.log(`-----calculate Paint Amount-----`);
console.log(i1.calculatePaintAmount(25));
console.log(i1.amountOfPaint);
console.log(`-----calculate Paint Amount based on length and width-----`);
console.log(i1.calculateRoomSurface(5, 8));
console.log(i1.amountOfPaint);
console.log(`-----calculate PaintAmount for double layer-----`);
console.log(i1.calculateRoomSurfaceforDoubleLayer(25));
console.log(i1.amountOfPaint);
console.log(`-----calculate total Paint Amount-----`);
console.log(i1.totalAmount());
console.log(`-----print Item Object-----`);
console.log(i1);

console.log(`-----item2-----`);
let i2 = new Item(
  "ACORN (87)",
  48.9,
  158.41,
  "green",
  "colors of England",
  "floors and ceilings",
  "glossy"
);

console.log(i2.calculatePaintAmount(25));
console.log(i2.totalAmount());
console.log(i2.amount);

console.log(`-----item3-----`);
let i3 = new Item(
  "ARRAS™ (316)",
  48.9,
  158.41,
  "dark rose",
  "stone",
  "floors and ceilings",
  "matt"
);

console.log(i3.totalAmountV2(3));
console.log(i3.amount);

console.log(`-----item4-----`);
let i4 = new Item(
  "BOOK ROOM GREEN™ (322)",
  48.9,
  158.41,
  "green",
  "stone",
  "metal and wood",
  "matt"
);

console.log(i4.totalAmountV3(8));
console.log(i4.amount);

/* ******************************************************************************************************** */
//STEP 3. Let's create list of Items to simulate searching and filtering of items:
/* ******************************************************************************************************** */
console.log(`\n`);
console.log(`-----3. Search and filter items-----`);
console.log(`-----Create Items Array-----`);
let itemsList = [];

const pushItemsToList = (item) => {
  itemsList.push(item);
  return itemsList;
};

console.log(pushItemsToList(i1));
console.log(pushItemsToList(i2));
console.log(pushItemsToList(i3));
console.log(pushItemsToList(i4));

// // Or, simply do this:
// let itemsArray = [i1, i2, i3, i4];
// console.log(itemsArray);

console.log(`-----Filter Items by Color in your Items Array-----`);
// reference link: https://www.geeksforgeeks.org/how-to-implement-a-filter-for-objects-in-javascript/
const filterByColor = (color) => {
  /* let's use map and filter */
  return (
    itemsList
      .filter((value) => value.color === color)
      /*return only name of the item */
      .map((element) => element.itemName)
  );
};
console.log(filterByColor("green"));

console.log(`-----Filter Items by Collection in your Items Array-----`);
const filterByCollection = (collection) => {
  return itemsList
    .filter((value) => value.collection === collection)
    .map((element) => element.itemName);
};

console.log(filterByCollection("colors of England"));

/* ******************************************************************************************************** */
//STEP 4. Let's create a Shopping Cart Object
/* ******************************************************************************************************** */
console.log(`\n`);
console.log(`-----4. Shopping Cart-----`);
console.log(`----- Create shopping cart-----`);
// 1. Create an empty array to store item objects:
let obj = [];
// 2. Add item to cart
let addItemToCart = (item) => {
  obj.push(item);
  return obj;

  /* Or, Filter Item by Name and then push item to your new array of Objects */
  // let itemInItemsList = itemsList.filter(
  //   (itemCheck) => itemCheck.itemName == item
  // );
  /* if item exists in itemsList */
  // if (itemInItemsList.length > 0) {
  //   obj.push(itemInItemsList[0]);
  //   return obj;
  // }

  //REMEMBER: obj.push(itemInItemsList) gives:
  // [ Item { name: 'cinnammon roll', type: 'food', price: 3.5 } ],
  // [ Item { name: 'espresso', type: 'drink', price: 2.5 } ],
  // [ Item { name: 'bagel', type: 'food', price: 6.5 } ]

  //obj.push(itemInItemsList[0]) gives:
  // [
  //   Item { name: 'cinnammon roll', type: 'food', price: 3.5 },
  //   Item { name: 'espresso', type: 'drink', price: 2.5 },
  //   Item { name: 'bagel', type: 'food', price: 6.5 }
  // ]
};

console.log(addItemToCart(i1));
console.log(addItemToCart(i2));

// 3. Check total amount
let totalAmountInCart = (array) => {
  // define your sum variable
  let sum = 0;

  // object iteration
  for (let key of array) {
    //sum
    sum += key.amount;
  }
  return `Total amount of your shopping cart: €${sum}.`;
};

console.log(`-----Display total amount-----`);
console.log(totalAmountInCart(obj));

// 4. Create list of items as a string
let list = [];
const itemsInCart = (array) => {
  for (let key of array) {
    list += "\n" + key.itemName + " " + "€" + key.amount + " ";
  }
  return `Your shopping cart contains: ${list}`;
};

console.log(`-----Display items list as string-----`);
console.log(itemsInCart(obj));

// 5. Remove item
// reference link: https://codepen.io/chrisachinga/pen/MWwrZLJ

const removeItem = (name) => {
  //with for in loop
  let count = 1;
  // for (let item in obj) {
  //   if (obj[item].itemName === name) {
  //     count--;
  //     if (count === 0) {
  //       obj.splice(item, 1);
  //     }
  //   }
  // }

  //with for of loop, as all our objects are nested in an array
  for (let item of obj) {
    if (item.itemName === name) {
      count--;
      if (count === 0) {
        obj.splice(item, 1);
      }
    }
  }
  return obj;
};

//console.log(`-----Remove item-----`);
//console.log(removeItem("50S MAGNOLIA"));

// 6. Remove all items / Clear cart
const clearCart = () => {
  obj = [];
  return `Your cart is empty.`;
};

//console.log(`-----Remove all items-----`);
//console.log(clearCart());
//console.log(obj);

//NOTE:
// to change amount of paint, simply use methods in the Items Class. It will be then automaticall updated in the cart.

/* ******************************************************************************************************** */
//STEP 5. Display client profile
/* ******************************************************************************************************** */
console.log(`\n`);
console.log(`-----5. User Profile-----`);
//1. Create object with user object properties:

/* add to Object */
// const createUserProfileV2 = () => {
//   let userProfileV2 = {};
//   userProfileV2.user1 = user1;
//   userProfileV2.obj = obj;
//   return userProfileV2;
// };
// console.log(createUserProfileV2());

/* add to Array with console.table */
let userProfile = [];
const createUserProfile = () => {
  userProfile.push(user1);
  for (let key in obj) {
    userProfile.push(obj[key]);
  }
  return userProfile;
};

console.log(createUserProfile());
console.table(userProfile, [
  "firstName",
  "lastName",
  "email",
  "itemName",
  "amount",
  "amountOfPaint",
]);

/////////////////////////////

// CHECK YOUR FUNCTION HERE

/////////////////////////////
