# @fabio/amazon-alert

Amazon price drop alert app!

![screenshot](https://github.com/fab1o/amazon-alert/blob/main/asset/screenshot.png?raw=true)

## Motivation

I have tried two price tracking services in the past but they are just too slow and have not tracked the products in my wish list. As a consequence, I ended up missing deals.

Fool me once, shame on you; fool me twice, shame on me. This app will make daily, hourly and even half-hourly checks to see if the price has dropped. Do you want to check every 15 minutes or less? Ask for it [here](https://github.com/fab1o/amazon-alert/issues).

When a price of a product at Amazon has dropped to your price or under, this app will play an [audio alert](https://github.com/fab1o/amazon-alert/tree/main/asset) and a Chrome window will open at Amazon.com with the product page for you to make the purchase. Just leave the app running and rest assured, you won't miss the next deal.

Tested on MacOS Terminals (it runs via command-line). Not tested on Windows yet.


## Run as stand-alone executable

[Download](/tree/main/dist) the binary in the dist folder and execute. (under development)

## Run in Node

Follow the 3 steps below:

#### 1. Installing Node

This app runs on Node. To install Node, go to [https://nodejs.org/en](https://nodejs.org/en) download and install version LTS.

Make sure Node is installed by running it on Terminal:

```sh
node --version
```
#### 2. Setup
Then install this app by running:

```sh
npm install --global @fab1o/amazon-alert
```

If you get an error, try running it with [Admin rights](https://support.apple.com/guide/terminal/enter-administrator-commands-apd5b0b6259-a7d4-4435-947d-0dff528912ba/mac#:~:text=To%20run%20commands%20with%20superuser,sudo%20stands%20for%20superuser%20do.&text=You're%20asked%20for%20the%20password%20of%20the%20current%20user.&text=You're%20asked%20to%20enter,is%20opened%20for%20that%20user.):

```sh
sudo npm install --global @fab1o/amazon-alert
```

Type your computer login password to allow the app to be installed.

#### 3. Running the App

Type on Terminal:

```sh
amazon-alert
```

#### Installing Chrome

Chrome is a soft requirement. It will work without it but it's better to have it.

### Complete Usage Guide

```sh
amazon-alert [-u product_url] [-f frequency] [-p price] [--mute]
```

Those are all optional parameters.

Where:

-   **-u, --url** Product url, i.e: https://www.amazon.com/dp/B0812JPZFT
-   **-f, --frequency** Frequency to run price checker, options are: Daily, Hourly, Half-Hourly
-   **-p, --price** Price you want to be alerted
-   **-m, --mute** No audio alert

## Examples

### Running the app

```sh
amazon-alert
```

The app will ask you to select a product from a list.

### Running the app with a product url

Go to [Amazon.com](Amazon.com) to copy and paste the url.

```sh
amazon-alert --url https://www.amazon.com/dp/B0812JPZFT
```

### Running the app daily

```sh
amazon-alert --url https://www.amazon.com/dp/B0812JPZFT --frequency Daily
```

---

### Help

```sh
amazon-alert --help
```

or ask a question [here](https://github.com/fab1o/amazon-alert/issues).
