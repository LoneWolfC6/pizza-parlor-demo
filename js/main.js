// ================================
// Pizza Order Form Logic (order.html)
// ================================
if (document.querySelector('#pizza-order-form')) {
  const form = document.querySelector('#pizza-order-form');
  const confirmationMessage = document.querySelector('.confirmation-message');
  const addToOrderBtn = document.querySelector('#add-to-order');
  const pizzaSelect = document.querySelector('#pizza');
  const quantityInput = document.querySelector('#quantity');
  const orderList = document.querySelector('#order-list');
  let orderItems = JSON.parse(localStorage.getItem('pizzaOrder')) || [];

  const pizzaPrices = {
    'Margherita Pizza': 10,
    'Pepperoni Classic': 12,
    'Veggie Delight': 11
  };

  // Update order list display
  function updateOrderList() {
    orderList.innerHTML = '';
    orderItems.forEach((item, index) => {
      const total = pizzaPrices[item.pizza] * item.quantity;
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        ${item.quantity} x ${item.pizza} ($${total})
        <button data-index="${index}" class="remove-btn">Remove</button>
      `;
      orderList.appendChild(listItem);
    });

    // Save to localStorage
    localStorage.setItem('pizzaOrder', JSON.stringify(orderItems));
  }

  // Handle "Add to Order" button click
  addToOrderBtn.addEventListener('click', () => {
    const pizza = pizzaSelect.value;
    const quantity = parseInt(quantityInput.value, 10);

    if (pizza && quantity > 0) {
      orderItems.push({ pizza, quantity });
      updateOrderList();
      pizzaSelect.value = '';
      quantityInput.value = 1;
    } else {
      alert('Please select a pizza and enter a valid quantity.');
    }
  });

  // Handle removing items from order
  orderList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
      const index = event.target.getAttribute('data-index');
      orderItems.splice(index, 1);
      updateOrderList();
    }
  });

  // Handle form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (orderItems.length === 0) {
      alert('Please add at least one pizza to your order.');
      return;
    }

    const name = document.querySelector('#name').value;
    const phone = document.querySelector('#phone').value;
    const instructions = document.querySelector('#instructions').value;

    let totalPrice = 0;
    let summary = `<p><strong>Order Summary for ${name}</strong></p><ul>`;
    orderItems.forEach(item => {
      const price = pizzaPrices[item.pizza] * item.quantity;
      totalPrice += price;
      summary += `<li>${item.quantity} x ${item.pizza} ($${price})</li>`;
    });
    summary += `</ul><p><strong>Phone:</strong> ${phone}</p>`;
    summary += `<p><strong>Total Price:</strong> $${totalPrice}</p>`;

    if (instructions.trim() !== '') {
      summary += `<p><strong>Special Instructions:</strong> ${instructions}</p>`;
    }

    // Display confirmation message
    form.style.display = 'none';
    confirmationMessage.innerHTML = summary + `<p>Thank you for your order! 🍕 We'll start preparing it right away.</p>`;
    confirmationMessage.style.display = 'block';

    localStorage.removeItem('pizzaOrder');
  });

  // Initialize order list on page load
  updateOrderList();
}


// ================================
// Contact Form Logic (contact.html)
// ================================
if (document.querySelector('#contact-form')) {
  const contactForm = document.querySelector('#contact-form');
  const contactConfirmation = document.querySelector('.confirmation-message');

  // Simple confirmation message on submit (demo only)
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    contactForm.style.display = 'none';
    contactConfirmation.style.display = 'block';
  });
}
