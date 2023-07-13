# @fabio/amazon-alert

Amazon price drop alert application.

When a price of a product at Amazon has reached your price, a Chrome window will open at Amazon.com for you to buy the product.

For MacOS Terminals (it runs via command-line).

```sh
-------------------------------------------------------------------
  __   _  _   __   ____  __   __ _     __   __    ____  ____  ____
 / _\ ( \/ ) / _\ (__  )/  \ (  ( \   / _\ (  )  (  __)(  _ \(_  _)
/    \/ \/ \/    \ / _/(  O )/    /  /    \/ (_/\ ) _)  )   /  )(
\_/\_/\_)(_/\_/\_/(____)\__/ \_)__)  \_/\_/\____/(____)(__\_) (__)
-------------------------------------------------------------------
```

## Requirements

1. Chrome
2. Node

This app runs on Node. To install node, go to [https://nodejs.org/en](https://nodejs.org/en) download and install version LTS.

Make sure node is installed by running on Terminal:

```sh
node --version
```

Then install this app on Terminal:

```sh
sudo npm install --global @fab1o/amazon-alert
```

Type your computer login password to allow the application to be installed.

Now, run the app:

```sh
amazon-alert
```
---

## Usage

```sh
amazon-alert [-u product_url] [-f frequency] [-p price] [--mute]
```

Where:

-   **-u, --url** Product url, i.e: https://www.amazon.com/dp/B0812JPZFT
-   **-f, --frequency** Frequency to run price checker, options are: Daily, Hourly, Half-Hourly
-   **-p, --price** Price you want to be alerted
-   **-m, --mute** No audio alert

## Examples

### Running the application

```sh
amazon-alert
```

The application will ask you to select a product from the default products list available.

### Running the application with a product url

Go to [Amazon.com](Amazon.com) to copy and paste the url.

```sh
amazon-alert --url https://www.amazon.com/dp/B0812JPZFT
```

### Running the application daily

```sh
amazon-alert --url https://www.amazon.com/dp/B0812JPZFT --frequency Daily
```

---
### Help

```sh
amazon-alert --help
```

or ask a question [here](https://github.com/fab1o/amazon-alert/issues).
