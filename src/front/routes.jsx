import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Register } from "./pages/Login"; // Este es el LOGIN
import { Signup } from "./pages/Signup"; // Este es el REGISTRO
import { Cart } from "./pages/Cart";
import { MyCourses } from "./pages/MyCourses";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { Blog } from "./pages/Blog";
import { Testimonios } from "./pages/Testimonios";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { FAQ } from "./pages/FAQ";
import { Privacy } from "./pages/Privacy";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      errorElement={<h1>Not found!</h1>}
    >
      <Route index element={<Home />} />
      <Route path="demo" element={<Demo />} />
      <Route path="single/:theId" element={<Single />} />
      <Route path="login" element={<Register />} />
      <Route path="register" element={<Signup />} />
      <Route path="cart" element={<Cart />} />
      <Route path="my-courses" element={<MyCourses />} />
      <Route path="payment-success" element={<PaymentSuccess />} />
      <Route path="blog" element={<Blog />} />
      <Route path="testimonios" element={<Testimonios />} />
      <Route path="blog/:id" element={<Blog />} />
      <Route path="nosotros" element={<About />} />
      <Route path="contacto" element={<Contact />} />
      <Route path="faq" element={<FAQ />} />
      <Route path="privacidad" element={<Privacy />} />
    </Route>
  )
);