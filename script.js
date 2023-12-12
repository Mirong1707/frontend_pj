document.addEventListener("DOMContentLoaded", function() {
    const chartCanvas = document.getElementById('chartCanvas');
    const chartCtx = chartCanvas.getContext('2d');
    const orderBookCanvas = document.getElementById('orderBookCanvas');
    const orderBookCtx = orderBookCanvas.getContext('2d');
    const orderModal = document.getElementById('orderModal');

    orderBookCanvas.width *= 2;
    orderBookCanvas.height *= 2;

    const orderBook = {
        buyOrders: [],
        sellOrders: []
    };

    const generateRandomOrder = () => ({
        price: Math.random() * 100,
        quantity: Math.floor(Math.random() * 10)
    });

    const drawOrderBook = () => {
        orderBookCtx.clearRect(0, 0, orderBookCanvas.width, orderBookCanvas.height);
        const rowHeight = orderBookCanvas.height / 10;

        orderBook.buyOrders.forEach((order, index) => {
            orderBookCtx.fillStyle = 'rgba(0, 128, 0, 0.7)';
            orderBookCtx.fillRect(10, index * rowHeight, order.quantity * 5, rowHeight);
            orderBookCtx.fillStyle = 'black';
            orderBookCtx.fillText(order.price.toFixed(2), 20, (index + 0.5) * rowHeight);
        });

        orderBook.sellOrders.forEach((order, index) => {
            orderBookCtx.fillStyle = 'rgba(255, 0, 0, 0.7)';
            orderBookCtx.fillRect(orderBookCanvas.width - order.quantity * 5 - 10, index * rowHeight, order.quantity * 5, rowHeight);
            orderBookCtx.fillStyle = 'black';
            orderBookCtx.fillText(order.price.toFixed(2), orderBookCanvas.width - 60, (index + 0.5) * rowHeight);
        });
    };

    const updateOrderBook = () => {
        orderBook.buyOrders = Array.from({ length: 10 }, generateRandomOrder);
        orderBook.sellOrders = Array.from({ length: 10 }, generateRandomOrder);
        drawOrderBook();
    };

    setInterval(updateOrderBook, 1000);

    const data = {
        labels: Array.from({ length: 10 }, (_, i) => i.toString()),
        datasets: [{
            borderColor: '#4caf50',
            borderWidth: 2,
            data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
            fill: false,
        }]
    };

    const options = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                ticks: {
                    display: false
                }
            },
            y: {
                min: 0,
                max: 100,
            }
        },
        animation: {
            duration: 1000,
            easing: 'linear',
            onComplete: () => {
                window.requestAnimationFrame(updateChart);
            }
        }
    };

    const chart = new Chart(chartCtx, {
        type: 'line',
        data: data,
        options: options
    });

    function updateChart() {
        const newData = chart.data.datasets[0].data;
        newData.shift();
        newData.push(Math.floor(Math.random() * 100));

        const newLabels = chart.data.labels.map((label) => (parseInt(label) + 1).toString());
        chart.data.labels = newLabels;

        chart.update();
    }

    function openOrderModal() {
        orderModal.style.display = 'block';
    }

    function closeOrderModal() {
        orderModal.style.display = 'none';
    }

    const buyButton = document.getElementById('buyButton');
    const sellButton = document.getElementById('sellButton');
    const closeModal = document.getElementById('closeModal');
    const confirmOrderButton = document.getElementById('confirmOrder');

    buyButton.addEventListener('click', openOrderModal);
    sellButton.addEventListener('click', openOrderModal);
    closeModal.addEventListener('click', closeOrderModal);

    confirmOrderButton.addEventListener('click', function() {
        // Здесь можно добавить логику обработки подтверждения ордера
        closeOrderModal();
    });
});
