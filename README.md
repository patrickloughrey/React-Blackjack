# React BlackJack #
## Live Heroku Link ##
[React BlackJack](https://react-blackjack-app.herokuapp.com/)
#### A BlackJack card game built with React.js and Redux. We set up unit testing using Mocha, Chai, & Enzyme. A user must sign up to enter the blackjack room. When a user signs up, the user's credentials are securely stored in the MongoDB database with password encryption. User authentication is set up to ensure successful login for each user session, which is maintained with Passport. The blackjack player's record is established after playing, and is saved in the database as well.
## Commands ##  
* cd client && npm install -> installs react app dependencies
* cd client && npm start -> performs webpack build & hosts react app
* cd client && npm test -> runs mocha, chai, enzyme unit tests
* cd client && npm webpack -> performs webpack build, creating bundle.js 
* cd server && npm install -> installs back-end dependencies
* cd server && node/nodemon start -> runs server for home page
## Tasks ##
- [x] Set up entire blackjack game with React.js
- [x] Finish styling blackjack "room"
- [x] Create home page & styling
- [x] Create Sign-Up/Log-In Forms
- [x] Set up server.js file 
- [x] Set up MongoDB schema and connection
- [x] Set up user authentication, mongoose middleware & sessions with Passport
- [x] Deploy to Heroku
- [ ] Add Log Out Button
- [ ] Add styling to game over component
- [ ] Add React component for betting chips and maintain player's chip total
- [ ] Add encryption to User's credentials in MongoDB
- [ ] Add delay to dealer's card dealing
- [ ] Maintain user's chip total even when logging out
- [ ] Add modal when entering blackjack room, to ask player how many chips he/she wishes to buy
- [ ] Final Task -> Use web sockets to add multiple players in room 
## Contributors ##
Patrick Loughrey, Andrew Federowicz, Tony Carnese

