# Ecommerce Node

-=ECommerce App=-


🗃️ Database Tables

*Products

*Cart

*Orders

*Users

*Routes


🧑 For users

/login -> to login user

/signup -> signup user

/me -> to return current logged in user based on auth token (Role based auth)


💸 For products

/products (post) -> to create a product

/products/id (get, put, delete) -> fetch, update and delete a single product /products (get) -> Search api for products, this will include full text search


🛒 For cart

/cart (post) -> to add product to cart

/cart (get) -> to list the cart

/cart (put) -> modify the cart

📃 For orders
/orders (post) -> create order from the cart 
/orders (get) -> list all orders of user 
/orders/id (get) -> list single order and its products
