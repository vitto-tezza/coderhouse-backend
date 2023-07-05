console.log('SISTEMA INICIADO')

const getOrders = async () => {
    const domOrdersList = document.getElementById('orders');
    const response = await fetch('http://localhost:3000/api/orders');
    const jsonResponse = await response.json();
    const orders = jsonResponse.result;

    orders.forEach(order => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${order.number} ($ ${order.totalPrice}) ${order.completed ? 'delivered': 'pending'}`;
        li.style.backgroundColor = order.completed ? 'lightgreen': '#f90';
        domOrdersList.appendChild(li);
    });
};

getOrders();