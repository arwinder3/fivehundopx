# FiveHundoPX
Web application that displays photos in a masonry layout. 500px is used to fetch photos, and for now only the "popular" feature is shown.

## Installing
First you will need to clone the repo to a local folder. To do this please run the following commands:
```Shell
git clone https://github.com/arwinder3/fivehundopx.git fivehundopx
```

Then cd into the newly created directory:
```Shell
cd fivehundopx
```

Next you'll need to install the npm dependencies, can do so by running this:
```Shell
npm install
```

## Running the server
Once you've cloned the repo and installed the npm dependencies you're good to start the server:
```Shell
npm start
```

You can then go to http://localhost:2999 to view the application.

## Configuring the server
If you would like to change the host/port you can edit webpack.config.js:

```Javascript
host: process.env.HOST,
port: process.env.PORT || 2999
```
