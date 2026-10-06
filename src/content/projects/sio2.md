---
title: Algorithmic Trading Platform
date: 2026-07-01
summary: A research platform for building, optimizing, and backtesting intraday silver futures strategies.
tags: [software, finance]
role: Developer
order: 3.5
---

## What it does

- Genetic-algorithm optimizer and neural-net models for an intraday strategy on CME silver futures (1-minute bars)
- Backtests against real tick data, modeling commission, limit-order fills, 150ms execution latency, and order-book depth
- Clean holdout protocol so strategy selection and final evaluation never touch the same data

## The web app

- Candlestick charts with custom indicators written in JavaScript or Python (Pyodide) right in the browser
- Launch GA optimization and training runs, stream their progress live, and push results back
- Batch CSV uploads for market data

## Tech Stack

- SvelteKit + Drizzle + PostgreSQL, Better Auth
- Python, PyTorch, pandas, Databento for market data
- Docker Compose
