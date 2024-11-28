# Product Management Application

## Overview

This application is a **Product Management System** built with **Angular 18**. It is designed to manage a product catalog by allowing users to add, view, and edit product information. The system is user-friendly and provides an intuitive interface with a modal dialog for adding new products.

## Key Features

- **Add New Product**: Users can add new products to the catalog through an easy-to-use form.
- **Responsive UI**: The interface is designed to be responsive and provides an optimal viewing experience on both desktop and mobile devices.
- **Material Design Components**: Utilizes Angular Material for modern and accessible UI components.
- **Mock Backend**: Uses `json-server` to serve as a mock backend for data storage and retrieval.

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **Angular CLI** (version 14 or higher)
- **npm** (Node Package Manager)

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-repo/product-management-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd product-management-app
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Application

To run the app locally, follow these steps:

1. Start the Angular development server:

   ```bash
   ng serve
   ```

   This will run the app on `http://localhost:4200/` by default.

2. For the data to be served correctly, run the `json-server` with the following command:

   ```bash
   npx json-server --watch db.json --routes routes.json --id ProductId
   ```

   - This command starts a local server on `http://localhost:3000` where the `db.json` file acts as the database, and `routes.json` manages custom routing logic.

## Application Structure

### Components

- **AddProductComponent**: A dialog component for adding new products.
- **ProductListComponent**: Displays a list of all products.
- **ProductCardComponent**: A reusable card component to showcase individual product details.

### Services

- **AppService**: A generic service for handling CRUD operations for various resources
- **ProductService**: Handles data operations, including fetching and saving products from the json-server backend.
- **OrderService**: A service dedicated to managing order details and their associated products
- **UserService**: A service dedicated to managing users details

## How to Use

1. **Adding Products**:

   - Click the "Add Product" button to open a modal dialog.
   - Fill out the product details (e.g., Product Name, Image URL, Available Pieces, and Product Price).
   - Click "Save" to add the product to the catalog.

2. **Viewing Products**:

   - The `ProductListComponent` displays all products, showing relevant information in a card format.

## Sample Data Structure

The `db.json` file should have a structure similar to:

```json
{
  "orders": [
    {
      "OrderId": 1233,
      "OrderDate": "Wed Sep 18 2019 12:45:37 GMT+0200(Eastern European Standard Time)",
      "UserId": "8475-2345-2312",
      "Products": [
        {
          "ProductId": 124,
          "Quantity": 2
        },
        {
          "ProductId": 127,
          "Quantity": 1
        },
        {
          "ProductId": 130,
          "Quantity": 1
        }
      ],
      "PaymentType": "online"
    }
  ],
  "products": [
    {
      "ProductId": 1,
      "ProductName": "Sample Product",
      "ImageURL": "https://example.com/image.jpg",
      "AvailablePieces": 100,
      "ProductPrice": 25.99
    }
  ],
  "users": [
    {
      "Id": "1231-1244-1233",
      "Name": "Mohamed Ashraf",
      "Email": "Mohamed.Ashraf@Gmail.com",
      "Phone": "01144558866",
      "Address": "55 Mohammed Mostafa El Sayed, An Nadi Al Ahli, Nasr City, Cairo Governorate",
      "RegisterDate": "Wed Sep 18 2019 12:35:14 GMT+0200 (Eastern European Standard Time)"
    }
  ]
}
```

## Conclusion

This application is a complete solution for managing product information. By using Angular 18 and Angular Material, it offers a modern and efficient user interface combined with a mock backend for data handling.

---
