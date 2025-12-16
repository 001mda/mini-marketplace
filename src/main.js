import './styles/style.css'

const productsList = document.getElementById('products-list');

async function loadProducts() {
  const response = await fetch('https://fakestoreapi.com/products');
  const products = await response.json();

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product';

    card.innerHTML = `
      <img src="${product.image}" width="100" />
      <h4>${product.title}</h4>
      <p>$${product.price}</p>
      <button>Add to cart</button>
    `;

    card.querySelector('button').addEventListener('click', () => {
      window.dispatchEvent(
        new CustomEvent('add-to-cart', { detail: product })
      );
    });

    productsList.appendChild(card);
  });
}
const cartCount = document.getElementById('cart-count');

window.addEventListener('cart-updated', (e) => {
  cartCount.textContent = e.detail;
});
loadProducts();
