import { Router } from "express";
//import { ProductManager } from "../dao/productManager.js";

import { ProductManagerMdb } from "../dao/productManagerMdb.js";
import { messageManagerMdb } from "../dao/messageManagerMdb.js";


const router = Router();
//const products = new ProductManager("./src/saborescaseros.json");
const products = new ProductManagerMdb();
const messages = new messageManagerMdb();


// renderizo  lista de productos existentes desde HTML en /products
// Obtiene los productos de la base en esta ruta y los renderiza con home.handlebars.
// No pasa por el socket por eso en public no precisa un js y utiliza el mismo css que para realtimeproducts

router.get("/", async(req, res) => {
  // renderizo la handlebars definida  
  try {
    const productList = await products.getProduct();
    // renderizo la handlebars definida
    res.render("home",
      {
        title: "Productos desde HTML",
        style: "productList.css",
        productList
      }
    );
    //console.log("Productlist en router.get de la view: ", productList);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// renderizo form y lista de productos actualizada desde socket

router.get("/realtimeproducts", async (req, res) => {    // en endpoint products/realtimeproducts muestra form para agregar y lista actualizada
  try {
    const productList = await products.getProduct();
    // renderizo la handlebars definida
    res.render("realTimeProducts",
      {
        title: "Real Time Products",
        style: "realtimeproducts.css",
        productList
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/chat", async (req, res) => {    
  try {
    const chatList = await messages.getMessages();
    // renderizo la handlebars definida
    res.render("chatHandlebar",
      {
        title: "Chat por socket",
        style: "chat.css",
        chatList
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});


export default router;