---
title: StockSim
date: 2025-01-25
summary: A multiplayer paper-trading simulator for stocks and crypto, built to backtest trading algorithms.
tags: [software, finance]
role: Solo developer
links:
  - label: GitHub
    href: https://github.com/TotalSimplicity/stocksim
order: 4
---

## What it does

- Paper trading across stock and crypto markets, with multiplayer games against friends
- Live and historical prices from the Finnhub and Alpaca APIs
- Technical indicators (Stochastic, Bull & Bear, RedK Everex) written in Rust for speed
- Backtesting for trading algorithms

## How it works

- Svelte frontend, Python backend serving stock data, MySQL for portfolios
- Packaged with Docker Compose
