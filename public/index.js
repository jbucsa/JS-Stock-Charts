
function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    const useRealData = false;

    // This is the example url from the documentation => https://api.twelvedata.com/time_series?symbol=AAPL,EUR/USD,ETH/BTC:Huobi,TRP:TSX&interval=1min&apikey=

    // Below the url from the activity (passing four stock symbols)
    let GME, MSFT, DIS, BTNX;
    if (useRealData) {
        const url = 'https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=ENTER_YOUR_OWN_API_HERE';
        //Note that user will need to applied their API key
        const  response = await fetch(url, {
            headers: ({'Content-Type': 'application/json'})
        });
        const myJSON = await response.json();
        console.log(myJSON);    
        GME = myJSON.GME;
        MSFT = myJSON.MSFT;
        DIS = myJSON.DIS;
        BTNX = myJSON.BTNX;
    }
    else
    {
        GME = mockData.GME;
        MSFT = mockData.MSFT;
        DIS = mockData.DIS;
        BTNX = mockData.BNTX;
    }
    const stocks = [GME, MSFT, DIS, BTNX];

    stocks.forEach(stock => stock.values.reverse());

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock=>({
                label: stock.meta.symbol,
                data: stock.values.map(value=>parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['GME','MSFT','DIS', 'BTNX'], //stocks.length.values.map(value => value.symbol), // stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock=>({
                label: stock.meta.symbol,
                data: stock.values.map(value=>parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

    console.log(stocks[0].values);
    
}

main()