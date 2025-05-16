import { configureStore, createSlice } from "@reduxjs/toolkit";

const savedcart=localStorage.getItem("cart");
const localStorageCart=savedcart?JSON.parse(savedcart):[];


// create the Slice
const productsSlice=createSlice({
    name:'products',
    initialState:{
        Veg: [
            { name: 'tomato', price: 200.5, image: '/Images/Tomato.jpg' },
            { name: 'potato', price: 184.5, image: '/Images/potato.jpg' },
            { name: 'brinjal', price: 195.5, image: '/Images/brinjal.jpg' },
            { name: 'carrot', price: 165.0, image: '/Images/carrot.jpg' },
            { name: 'cabbage', price: 120.0, image: '/Images/cabbage.jpg' },   
            { name: 'cauliflower', price: 140.5, image: '/Images/cauliflower.png' },
            { name: 'onion', price: 170.0, image: '/Images/onions.jpg' },
            { name: 'spinach', price: 95.0, image: '/Images/spinach.jpg' },
            { name: 'peas', price: 180.0, image: '/Images/peas.jpg' },          
            { name: 'beetroot', price: 150.5, image: '/Images/beetroot.jpg' }
          ],
          NonVeg: [
            { name: 'chicken breast', price: 350.0, image: '/Images/chicken_breast.jpg' },
            { name: 'mutton curry cut', price: 600.0, image: '/Images/mutton.jpg' },
            { name: 'fish fillet', price: 420.0, image: '/Images/fish.jpg' },
            { name: 'prawns', price: 550.0, image: '/Images/prawns.jpg' },
            { name: 'egg pack (12)', price: 90.0, image: '/Images/eggs.jpg' },
            { name: 'chicken drumsticks', price: 370.0, image: '/Images/chicken_drumsticks.jpg' },
            { name: 'rohu fish whole', price: 320.0, image: '/Images/rohu_fish.jpg' },
            { name: 'duck meat', price: 580.0, image: '/Images/duck.jpg' },
            { name: 'quail meat', price: 650.0, image: '/Images/quail.jpg' },
            { name: 'crab', price: 700.0, image: '/Images/crab.jpg' }
          ],
          milk: [
            { name: 'Royal Badam Milk', price: 30, image: '/milk/badammilk.jpg' },
            { name: 'Creamy Butter Pack', price: 399, image: '/milk/butter.jpg' },
            { name: 'Spiced Buttermilk', price: 32, image: '/milk/buttermilk.jpg' },
            { name: 'Mozzarella Cheese', price: 220, image: '/milk/cheese.jpg' },
            { name: 'Milk Khova', price: 460, image: '/milk/cova.jpg' },
            { name: 'Fresh Curd Bowl', price: 45, image: '/milk/curd.jpg' },
            { name: 'Pure Cow Ghee', price: 599, image: '/milk/ghee.jpg' },
            { name: 'Ice Cream Tub', price: 320, image: '/milk/icecream.jpg' },
            { name: 'Full Cream Milk', price: 42, image: '/milk/milk.jpg' },
            { name: 'Instant Milk Powder', price: 265, image: '/milk/milkpowder.jpg' },
            { name: 'Farm Fresh Paneer', price: 440, image: '/milk/paneer.jpg' }
          ],
          
          chocolate: [
            { name: '5Star Choco Bar', price: 20, image: '/chocolate/5star.jpg' },
            { name: 'Cadbury Dairy Milk', price: 180, image: '/chocolate/dairymilk.jpg' },
            { name: 'Fabelle Premium', price: 275, image: '/chocolate/fabelle.jpg' },
            { name: 'Fuse Nutty Delight', price: 45, image: '/chocolate/fuse.jpg' },
            { name: 'KitKat Crunchy Wafer', price: 110, image: '/chocolate/kitkat.jpg' },
            { name: 'Snickers Energy Bar', price: 75, image: '/chocolate/snicker.jpg' },
            { name: 'Perk Double Delight', price: 15, image: '/chocolate/perk.jpg' },
            { name: 'Bournville Chocolate', price: 120, image: '/chocolate/bournville.jpg' },
            { name: 'Milkybar White Treat', price: 50, image: '/chocolate/milkybar.jpg' },
            { name: 'Amul Dark Chocolate', price: 99, image: '/chocolate/amuldark.jpg' },
            { name: 'Toblerone Swiss', price: 240, image: '/chocolate/toblerone.jpg' },
            { name: 'Ferrero Rocher Box', price: 399, image: '/chocolate/ferrero.jpg' }
          ]
          
          
    },
    reducers:{}

});

// Create the Slice
const cartSlice=createSlice({
    name:'cart',
    initialState:localStorageCart,
    reducers:{
        AddToCart:(state,inputItem)=>{
            const item=state.find(item=>item.name===inputItem.payload.name);
            if(item)
            {
                item.quantity +=1;
            }
            else{
                state.push({...inputItem.payload,quantity:1});
            }
        },
        IncCart:(state,inputItem)=>{
            const item=state.find(item=>item.name===inputItem.payload.name);
            if(item)
            {
                item.quantity +=1;
            }
        },
        DecCart: (state, inputItem) => {
            const index = state.findIndex(item => item.name === inputItem.payload.name);
            if (index !== -1) {
              if (state[index].quantity > 1) {
                state[index].quantity -= 1;
              } else {
                state.splice(index, 1); // Properly remove the item if quantity reaches 0
              }
            }
          },          
        RemoveFromCart: (state, inputItem) => {
            const index = state.findIndex(item => item.name === inputItem.payload.name);
            if (index !== -1) {
              state.splice(index, 1); // remove 1 item at that index
            }
          },
          clearCart:()=>[]

    }
})
export let{AddToCart,IncCart,DecCart,RemoveFromCart,clearCart}=cartSlice.actions;


const ordersSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    OrderDetails: (state, action) => {
      const orderDetails = action.payload;
      state.push(orderDetails);
    },
  },
});

export const { OrderDetails } = ordersSlice.actions;


//create the User Slice
let userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        isAuthenticated: false,
        currentUser: null
    },
    reducers: {
        registerUser: (state, action) => {
            state.users.push(action.payload);
        },
        logInUser: (state, action) => {
            const foundUser = state.users.find(
                user =>
                    user.username === action.payload.username &&
                    user.password === action.payload.password
            );
            if (foundUser) {
                state.isAuthenticated = true;
                state.currentUser = foundUser;
            } else {
                alert("Invalid credentials");
                navigate("/SignIn");
                
            }
        },
        logOutUser: (state) => {
            state.isAuthenticated = false;
            state.currentUser = null;
        }
    }
})


//export user slice reducrs
export let { registerUser, logInUser, logOutUser } = userSlice.actions;

// configure the store
const store=configureStore({
    reducer:{
        products:productsSlice.reducer,
        cart:cartSlice.reducer,
        Orders: ordersSlice.reducer,
        users: userSlice.reducer,
    }
});

store.subscribe(()=>{
  const state=store.getState();
  localStorage.setItem("cart",JSON.stringify(state.cart));
})
// Export the store
export default store;