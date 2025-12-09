export const initialStore = () => {
  let token = null;
  let user = null;

  try {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) token = savedToken;
    if (savedUser) user = JSON.parse(savedUser);
  } catch (e) {
    console.error("Error leyendo localStorage", e);
  }

  return {
    token,
    user,
    courses: [],
    cart: []
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

    case "add_to_cart":
      return {
        ...store,
        cart: [...store.cart, action.payload]
      };

    case "remove_from_cart":
      return {
        ...store,
        cart: store.cart.filter((c) => c.id !== action.payload)
      };

    case "clear_cart":
      return {
        ...store,
        cart: []
      };

    default:
      return store;
  }
}