async function createProduct({
    name,
    description,
    price,
    stock,
    category_id,
    image_urls
}) {
   try{ const { rows: [ newProduct ]} = await client.query(`
    INSERT INTO products (name, description, price, stock, category_id, image_urls)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `,
    [name, description, price, stock, category_id, image_urls]
    );
    return newProduct
    } catch (error) {
        console.error('error with creating product', error)
        throw error;
    } 
}

async function updateProduct(productId, {
    name,
    description,
    price,
    stock,
    category_id,
    image_urls
}) {
    try {
        const { rows: [updatedProduct] } = await client.query(`
            UPDATE products
            SET name = $2, description = $3, price = $4, stock = $5, category_id = $6, image_urls = $7
            WHERE id = $1
            RETURNING *;
        `,
        [productId, name, description, price, stock, category_id, image_urls]
        );
        return updatedProduct;
    } catch (error) {
        console.error('Error updating product', error);
        throw error;
    }
}


async function deleteProduct(productId) {
    try {
        const { rows: [deletedProduct] } = await client.query(`
            DELETE FROM products
            WHERE id = $1
            RETURNING *;
        `,
        [productId]
        );
        return deletedProduct;
    } catch (error) {
        console.error('Error deleting product', error);
        throw error;
    }
}

async function getAllProducts() {
    try {
      const { rows: products } = await client.query(`
        SELECT *
        FROM products;
      `);
      return products;
    } catch (error) {
      console.error('Error getting all products', error);
      throw error;
    }
  }

  module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
  };