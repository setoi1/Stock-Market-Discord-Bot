# Stock Market Discord Bot

## Description

A discord bot that displays user-requested company / ticker stock data in a readable form.

## Features

* Stock Market Information from the New York Stock Exchange
* Industry News Articles and Company-Specific News Articles
* Stock-specific ticker time series data

## Getting Started

### Prerequisites
* Node.js LTS (https://nodejs.org/en/)
* Git (https://git-scm.com/downloads)
* Discord Bot Token (https://discord.com/developers/docs/getting-started)
* PolygonIO API Key (https://polygon.io/)

### Installation and Setup
These instructions are designed for running this project on Windows; other operating systems may vary in set-up. 
1. Open Command Prompt (cmd.exe) and enter the following code in the terminal (one by one)
   
   ```
   cd Desktop
   git clone https://github.com/setoi1/Stock-Market-Discord-Bot.git
   cd Stock-Market-Discord-Bot
   npm install
   ```
2. The bot and all prequisites are now installed propery. You will need a Discord API key to invite and use the bot.
  
### Configuration
1. Ensure that you have:
   * Discord Bot Token
   * PolygonIO API Key
2. Go into the Stock-Market-Discord-Bot directory
3. Open config.json
4. Replace all placeholder values with their respective values
![image](https://github.com/setoi1/Stock-Market-Discord-Bot/assets/56894020/d97e2bc1-13b0-4375-97af-14a1938ee12c)
5. Once all values have been properly set, run this command:
 
   ```
   npm start
   ```

## Examples
### Ticker Details
*!stock details (TICKER)*

Example:

!stock details AAPL

![image](https://github.com/setoi1/Stock-Market-Discord-Bot/assets/56894020/cd773f6f-1f8f-4a47-97ad-df8d3c5b08d7)

### Ticker News
*!stock news (TICKER)*

Example:

!stock news AAPL

![image](https://github.com/setoi1/Stock-Market-Discord-Bot/assets/56894020/d83f9dea-21ec-45e4-baa7-875cd1b50808)

### Ticker Price (Daily / Open Close)
*!stock price (TICKER) (YYYY-MM-DD)*

Example:

!stock price AAPL 2023-10-26

![image](https://github.com/setoi1/Stock-Market-Discord-Bot/assets/56894020/53c8b9d2-7478-46f6-86af-902cbf1456b4)

## *More commands to be added*
