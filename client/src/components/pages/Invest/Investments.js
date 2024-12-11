import React, { useEffect, useRef, memo } from 'react';
import './TradingViewWidget.css'; // Import the CSS file for styling

function TradingViewWidget() {
    const heatmapContainer = useRef();
    const marketQuotesContainer = useRef();

    useEffect(() => {
        // Heatmap widget
        const heatmapScript = document.createElement("script");
        heatmapScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
        heatmapScript.type = "text/javascript";
        heatmapScript.async = true;
        heatmapScript.innerHTML = `
        {
          "exchanges": [],
          "dataSource": "SPX500",
          "grouping": "sector",
          "blockSize": "market_cap_basic",
          "blockColor": "change",
          "locale": "en",
          "symbolUrl": "",
          "colorTheme": "dark",
          "hasTopBar": false,
          "isDataSetEnabled": false,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "isMonoSize": false,
          "width": 800,
          "height": 600
        }`;
        heatmapContainer.current.appendChild(heatmapScript);

        // Market Quotes widget
        const marketQuotesScript = document.createElement("script");
        marketQuotesScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
        marketQuotesScript.type = "text/javascript";
        marketQuotesScript.async = true;
        marketQuotesScript.innerHTML = `
        {
          "width": 800,
          "height": 600,
          "symbolsGroups": [
            {
              "name": "Indices",
              "originalName": "Indices",
              "symbols": [
                { "name": "FOREXCOM:SPXUSD", "displayName": "S&P 500 Index" },
                { "name": "FOREXCOM:NSXUSD", "displayName": "US 100 Cash CFD" },
                { "name": "FOREXCOM:DJI", "displayName": "Dow Jones Industrial Average Index" },
                { "name": "INDEX:NKY", "displayName": "Japan 225" },
                { "name": "INDEX:DEU40", "displayName": "DAX Index" },
                { "name": "FOREXCOM:UKXGBP", "displayName": "FTSE 100 Index" }
              ]
            }
          ],
          "showSymbolLogo": true,
          "isTransparent": false,
          "colorTheme": "dark",
          "locale": "en",
          "backgroundColor": "#131722"
        }`;
        marketQuotesContainer.current.appendChild(marketQuotesScript);
    }, []);

    return (

        <div className="tradingview-widget-page">

            <div ref={heatmapContainer} className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget"></div>
            </div>
            <div ref={marketQuotesContainer} className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget"></div>
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);
