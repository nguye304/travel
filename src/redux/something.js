// console.clear();
// const {createStore, combineReducers} = Redux;

// //People Dropping off forms
// //these are action creators
// const createForm = (name,amountOfMoney) => {
//     return {//this is the form

//         type: 'CREATE_CLAIM', //this is the name/purpose of the form
//         payload:{ //what the form contains
//             name: name,
//             amt : amountOfMoney
//         }
//     }
// }
// //you can create many of these


// //The departments of the company
// //these are the reducers 
// //they will take in a form and work with the information/payload

// const formsHistory= (
//     oldListOfForms, //this is the old state?
//     action //this is the form thats coming in
//     ) =>{

//     if(action.type === 'CREATE_CLAIM'){
//         return[...oldListOfForms,action.payload];//you have to make a new array with so you copy the list after ... and then add the payload to it
//     }
//     return oldListOfForms; //return the same list without any changes

// }

// //company setup
// //the combine reducers function links up all our reducers
// const reducers = combineReducers({
//     //key: what the key is goign to
//     formsHistory:formsHistory,

// })

// const store = createStore(reducers);

// store.dispatch(createForm('kevin',100))