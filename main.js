import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



const appSettings = {
    databaseURL: "https://realtime-database-578b6-default-rtdb.firebaseio.com/"
    }
const app = initializeApp(appSettings);
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
const shoppingList = document.getElementById("shopping-list")

const button = document.getElementById("add-button")
const inputField = document.getElementById("input-field");


button.addEventListener('click', () => {
    let inputValue = inputField.value;
    push(shoppingListInDB, inputValue);
    clearInput()
});
const clearInput = () => {
    inputField.value = " "
}
const appendItemToShoppingList = (itemValue) => {
    shoppingList.innerHTML += `<li>${itemValue}</li>`
    
}
onValue(shoppingListInDB, (snapshot) => {
    let itemArrays = Object.values(snapshot.val())
    
    clearInput();
    for (let i = 0; i < itemArrays.length; i++) {
        appendItemToShoppingList(itemArrays[i])    
}

});