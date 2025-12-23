export const initialStore = () => {
  let token = null;
  let user = null;
  let cart = [];  

  try {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const savedCart = localStorage.getItem("cart");  

    if (savedToken) token = savedToken;
    if (savedUser) user = JSON.parse(savedUser);
    if (savedCart) cart = JSON.parse(savedCart);  
  } catch (e) {
    console.error("Error leyendo localStorage", e);
  }

  return {
    token,
    user,
    courses: [],
    cart  
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_token": {
      const token = action.payload;
      try {
        if (token) {
          localStorage.setItem("token", token);
        } else {
          localStorage.removeItem("token");
        }
      } catch (e) {
        console.error("Error guardando token en localStorage", e);
      }
      return {
        ...store,
        token
      };
    }

    case "set_user": {
      const user = action.payload;
      try {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          localStorage.removeItem("user");
        }
      } catch (e) {
        console.error("Error guardando user en localStorage", e);
      }
      return {
        ...store,
        user
      };
    }

    case "set_courses":
      return {
        ...store,
        courses: action.payload
      };

    case "add_to_cart": {
      const exists = store.cart.some(item => 
        item.id.toString() === action.payload.id.toString()
      );
      
      if (exists) {
        console.log("El curso ya está en el carrito");
        return store;
      }
      
      const newCart = [...store.cart, action.payload];
      
      
      try {
        localStorage.setItem("cart", JSON.stringify(newCart));
      } catch (e) {
        console.error("Error guardando carrito en localStorage", e);
      }
      
      return {
        ...store,
        cart: newCart
      };
    }

    case "remove_from_cart": {
      const newCart = store.cart.filter((c) => 
        c.id.toString() !== action.payload.toString()
      );
      
      
      try {
        localStorage.setItem("cart", JSON.stringify(newCart));
      } catch (e) {
        console.error("Error guardando carrito en localStorage", e);
      }
      
      return {
        ...store,
        cart: newCart
      };
    }

    case "clear_cart": {
      
      try {
        localStorage.removeItem("cart");
      } catch (e) {
        console.error("Error limpiando carrito en localStorage", e);
      }
      
      return {
        ...store,
        cart: []
      };
    }

    default:
      return store;
  }
}