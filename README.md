# @fabio/amazon-alert

Amazon price drop alert application.

```sh
-------------------------------------------------------------------
  __   _  _   __   ____  __   __ _     __   __    ____  ____  ____
 / _\ ( \/ ) / _\ (__  )/  \ (  ( \   / _\ (  )  (  __)(  _ \(_  _)
/    \/ \/ \/    \ / _/(  O )/    /  /    \/ (_/\ ) _)  )   /  )(
\_/\_/\_)(_/\_/\_/(____)\__/ \_)__)  \_/\_/\____/(____)(__\_) (__)
-------------------------------------------------------------------
```

## Requirements

This app runs on Node. To install node, go to [https://nodejs.org/en](https://nodejs.org/en) download and install version LTS.

Make sure node is installed by running on Terminal:
```sh
node --version
```

Then run on Terminal:

```sh
sudo npm install --global @fab1o/amazon-alert
```

## Usage

```sh
amazon-alert [-u product_url] [-f frequency] [-p price]
```

Where:

-   **-u, --url** Product url, i.e: https://www.amazon.com/dp/B0812JPZFT
-   **-f, --frequency** Frequency to run price checker, options are: Daily, Hourly, Half-Hourly
-   **-p, --price** Price you want to be alerted

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
### Help

```sh
amazon-alert --help
```

or ask a question [here](https://github.com/fab1o/amazon-alert/issues).
