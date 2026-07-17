# bakery-manager

A complete Inventory Management System built with **Node.js**, **Express**, **MongoDB**, and **JavaScript**. The application allows users to manage products through a simple and intuitive interface, supporting the main CRUD operations.

## ✨ Features

* 📦 Create new products
* 📋 View all registered products
* ✏️ Update product information
* 🗑️ Delete products
* 💾 Data persistence with MongoDB
* 🎨 Responsive and simple interface

## 🛠️ Technologies

* Node.js
* Express.js
* MongoDB
* Mongoose
* HTML5
* CSS3
* JavaScript (ES6)

## 📁 Project Structure

```text
│
├── backend
│   ├── api
│   │   ├── config
│   │   ├── middleware
│   │   ├── model
│   │   └── validations
│   ├── server.js
│   ├── package.json
│   └── docker-compose.yaml
│
└── frontend
    └── public
        ├── css
        ├── js
        └── pages
```

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/cypherghostmd/bakery-manager.git
```

Enter the project directory:

```bash
cd bakery-manager
```

Install the dependencies:

```bash
npm install
```
Start database

```bash
docker-compose up
```

Start the application:

```bash
node server.js
```

The application will be available at:

```text
http://localhost:3000
```

## 📚 API Endpoints

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| GET    | `/api/products`        | List all products    |
| GET    | `/api/product/:id`     | Get a product by ID  |
| POST   | `/api/add-product`     | Create a new product |
| PUT    | `/api/up-product/:id`  | Update a product     |
| DELETE | `/api/del-product/:id` | Delete a product     |

## 📌 Product Model

```json
{
  "name": "pao",
  "description": "crocante",
  "category": "paes",
  "price": 5,
  "quantity": 8,
  "expirationDate": "2026-12-31"
}
```
