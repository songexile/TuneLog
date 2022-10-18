# TuneLog 

- TuneLog is an app created in React Native. It allows users to sign up with their email and password to create an account.
- The app uses the Spotify API and retrieves the users OAuth 2.0 token to retrieve and display Spotify statistics, such as Top Songs, Top Artists, etc.
- You can follow other users to keep up to date with their music and things they have personalised on their profile!

## Warning - This application requires a Spotify account as it heavily depends on the Spotify API for full useage. Without a Spotify account you can't access the app.


## List of completed/in-development features
- **Login or create account**
  - Create profile with email & password, data stored in Firebase storage.
  - User can then sign in with this account in the future.
- **User profile**
  - Retrieve data from Firebase to display current users profile
  - Able to edit and save profile *(username, user status)*
- **Spotify Intergration**
  - User able to sign in and connect their Spotify Account.
  - Fetch user Spotify authorization token *(Using Spotify OAuth 2.0).*
  - Display users top songs and top artists in profile/stats page.
- Home Page
  - Users will be displayed the song they are current listening to on Spotify.
  - You are also able to log-out from this page.
- **IOS/Android compatible**
  - User able to use on both IOS and Android devices (although mainly tested on IOS).
  
  ## Future features
- **Music map**
    - In the future we plan on implementing a music map which can allow users to discover other people through music
- **Listening party**
    - Users will be able to join other listening parties and sync up there music with other users

## How to setup the app
- Recommended to use Visual Studio Code 1.70.2 and `powershell terminal` for running commands.
- In order to set up the app and install all dependencies, clone the repository and run:
### ``yarn install``

- You can then start the app by running:
### `yarn start`

- From here, simply follow the expo instructions in the CLI in order to run the project in an IOS/Android environment.
- **Please note, if you open the app using the QR code on another device, you must be on the same local area network as the machine running the app.**

