document.addEventListener('DOMContentLoaded', async () => {
    try {
        const symbol = 'EURUSD'; // Replace with the desired symbol
        const interval = '1m';   // Replace with the desired interval (e.g., 1m, 5m, 15m, etc.)
        const limit = 100;       // Number of candles to retrieve

        const rawData = await fetchCandleData(symbol, interval, limit);
        const formattedData = formatCandleData(rawData);

        displayCandleData(formattedData);
    } catch (error) {
        console.error('Error:', error);
    }
});

async function fetchCandleData(symbol, interval, limit) {
    const response = await fetch(`https://api.quotex.com/api/v1/market/candles?symbol=${symbol}&interval=${interval}&limit=${limit}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function formatCandleData(data) {
    return data.map(candle => ({
        time: new Date(candle.time * 1000).toISOString(),
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
        volume: candle.volume
    }));
}

function displayCandleData(data) {
    const container = document.getElementById('candle-data');
    data.forEach(candle => {
        const div = document.createElement('div');
        div.textContent = `Time: ${candle.time}, Open: ${candle.open}, High: ${candle.high}, Low: ${candle.low}, Close: ${candle.close}, Volume: ${candle.volume}`;
        container.appendChild(div);
    });
}
