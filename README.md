# Keep track of your crypto investments on Bittrex.


## Setup
This app requires a Google Firestore instance to operate. (Free tier is fine)

To set up a Firestore instance go to https://console.firebase.google.com and add a new project. The config of the instance doesn't matter.

When your instance is created, go to the Firestore console and click the cog icon next to the 'Project Overview' button in the top right. 

Next click on 'Add Firebase to your web app'. A modal will pop open with your API keys and other information needed.

Next run the command 

```node
npm run setup
```

You will be prompted to enter the information displayed on the Firestore modal. Make sure all the information is correct.

The script will create a Firestore config file for you in src/firestore, WHICH SHOULD NOT BE COMMITED to source control.

## Running

To start the local server, type 

```node
npm start
```
