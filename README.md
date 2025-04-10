# 🥣 HungerLens

**HungerLens** is a sleek, data-driven dashboard application built with **Next.js** and **Chakra UI**. It visualizes real-time hunger, poverty, and food price trends from open-source global datasets to support insights and awareness.

---

## 🚀 Getting Started

Follow these steps to set up HungerLens locally for development and testing.

---

## ✅ Prerequisites

Ensure you have the following installed:

- [**Node.js**](https://nodejs.org/) – Version 18 or later is recommended
- [**npm**](https://www.npmjs.com/) – Comes with Node.js

---

## 📦 Installation

Install all required dependencies:

```bash
npm install @chakra-ui/react@^2.10.4
npm install @chakra-ui/icons@^2.2.4
npm install next@15.2.2
npm install react@^19.0.0
npm install react-dom@^19.0.0
npm install react-icons
```

---

## 📥 Preparing the Data

Before running the app, you need to generate the required CSV file for food prices. This must be done through the companion **Google Colab notebook**, which scrapes and compiles the data from public sources.

➡️ [Open the Colab Notebook](https://colab.research.google.com/) *(insert your actual notebook URL here)*

This process will output a file named `combined_country_food_prices.csv`, which you'll need to download and place in your project directory.

> **Note:** If you're modifying the notebook, ensure that libraries such as `requests`, `pandas`, and `beautifulsoup4` are installed.

---

## 💻 Running the App

Start the development server:

```bash
npm run dev
```

Then open your browser and visit:

```
http://localhost:3000
```

---

## 📊 Tech Stack

- **Next.js 15** – React Framework for server-side rendering
- **React 19** – Latest frontend library
- **Chakra UI** – Modular and accessible component library
- **Plotly.js** – Interactive maps and charts
- **CSV / JSON Data** – World Bank, Humanitarian Data Exchange (HDX)

---

## 🌍 Data Sources

- 📈 **Poverty Data** – [World Bank Indicator: SI.POV.DDAY](https://data.worldbank.org/indicator/SI.POV.DDAY)
- 🍽️ **Hunger Data** – [Global Hunger Index (2024) - Kaggle](https://www.kaggle.com/datasets/faduregis/global-hunger-index-2024)
- 🛒 **Food Prices** – [WFP Global Food Prices Dataset (HDX)](https://data.humdata.org/dataset/global-wfp-food-prices?fbclid=IwY2xjawIvrKdleHRuA2FlbQIxMAABHRe8zUV68t9n-DYtvpT0dG_y2vslCq9SzGWRZwQfEGXC9BRcyGhoWkTCPw_aem_e3T_qGZzglT-IL8kl6lgxQ)

---

## 🧠 Authors

- Developed with love by the MA ANO ULAM 💚

---


## 🔔 Reminder

Make sure to generate and download `combined_country_food_prices.csv` from the companion **Google Colab notebook** before running the app.

> ⚠️ **Note:** This GitHub repository only contains the **Next.js + Chakra UI** frontend dashboard. The scraping and CSV generation are handled separately in Colab.

