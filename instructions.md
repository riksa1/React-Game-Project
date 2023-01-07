# App instructions

## Install
* Clone this repository to your computer
* Create .env file to the root of the project
* Add needed values to .env file (keep in mind for the MONGODB_URL to work you need to install MongoDB to your computer [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) or just create a MongoDB Atlas cluster and use a link to it [https://www.mongodb.com/atlas/database](https://www.mongodb.com/atlas/database)):
* Example values (can be used):
* MONGODB_URL=mongodb://127.0.0.1:27017/gameapp
* JWT_SECRET=wgewgwegwgewahreshbhhisehnresjnrenbjernsonjoenjerneonjsjnrjseonjrejesjo
![image](https://user-images.githubusercontent.com/59605589/210981422-df677016-d2d5-4777-9153-15df8f0b6d19.png)
* Open two terminals and on one go to the client folder, install all packages with command "npm install" and then start the website by typing command "npm start"
* On the other install all packages in the root directory using command "npm install", add some sample data to the database with the command "npm run load-sample-data" (recommended but not needed) and then start the dev server with command "npm run dev"
![image](https://user-images.githubusercontent.com/59605589/210988064-2d37ecdc-e45c-4998-a377-613657b88a81.png)
![image](https://user-images.githubusercontent.com/59605589/210989033-52f44dee-8951-48f0-8fad-7541af86272d.png)
* After all commands have been typed you should have open http://localhost:3000 which has the website fully funtional (you might need to refresh the page after server is up and running)
![image](https://user-images.githubusercontent.com/59605589/210993820-bbe6b197-4c13-4ac1-a37e-1a9c5acba16b.png)

## Find games
* To look at games you need to press the "Games" button on the left drawer and then you can look through all the games from the database and you can also filter them using the search bar and filtering options on the filtering menu. You can also choose between your own games and all games with checkboxes under filter menu when logged in
![image](https://user-images.githubusercontent.com/59605589/211025205-bc69695b-a9e6-4235-a6ae-d508c5d1681f.png)

## Styling
* You can switch the style of the website from "light mode" to "dark mode" (and vice versa) by pressing the switch on the top navbar
![image](https://user-images.githubusercontent.com/59605589/211025608-acefef85-13c7-4699-adea-e7c4130b32bd.png)

## Login, logout and register user
* Press the "login" button found in the top right corner (if you have a small screen you need to open the drawer by pressing the top right button first)

![image](https://user-images.githubusercontent.com/59605589/211027860-6f64b2b1-0e74-46f0-ac22-48bf8014ac15.png)
* Login page will be opened from where you can login to the application if you have an account)
![image](https://user-images.githubusercontent.com/59605589/211026177-760ec8bf-566a-4d84-b4e5-4ec801bb9c72.png)
* To create an account you can press the blue text "Sign Up" on the bottom of the login form and then a registeration form will be opened where you can create a new account with values "Name", "Email" and "Password"
![image](https://user-images.githubusercontent.com/59605589/211026276-82900de6-6207-4813-aeaa-9ab7148a74aa.png)
* After creating an account you will be returned to the home page logged in (you can see your name and avatar in the top right corner where the login button was)
* If you want to logout you can press the "logout" button on the left drawer and then the "login" button will reappear and you can login by pressing it and inputting your "Email" and "Password" to the login form

![image](https://user-images.githubusercontent.com/59605589/211026891-b631a7d4-b7d7-43d0-9891-15ec767078bd.png)

## Creating, editing and deleting games
* To do the commands here you need to login first (instructions on the top)
* To create a new game you can press the "New Game" button on the left drawer and typing all the information needed for the game
![image](https://user-images.githubusercontent.com/59605589/211029136-ba91f702-6bd1-4a3a-bbf4-4a792164e5bd.png)
* To update a game you can go to the "Games" page by pressing the "Games" button on the left drawer, then press the "Show only my games" checkbox and then search for the game you want to update using the search bar or filtering
* After finding the game you want to update you can press the "Edit" button on the game and you will be opened a form where you can update the already selected values

![image](https://user-images.githubusercontent.com/59605589/211029333-203f567f-5b3e-4580-98e1-dd9e29ee7f80.png)
* If you want to delete a game you need to first find the game the same way as for editing and then just press the "Delete" button and then the game will be deleted

![image](https://user-images.githubusercontent.com/59605589/211029406-c4c9f6c0-83d6-4425-b150-05aef922ec84.png)

## Modify profile
* To do the commands here you need to login first (instructions on the top)
* To edit your accounts general information you need to press the "Profile" button on the left drawer, press the "Edit profile" button and then update the fields you want to update on the opened form
* To edit your password you need to press the "Profile" button on the left drawer, press the "Change password" button and then input needed values on the form
* To remove your account you need to press the "Profile" button on the left drawer, press the "Delete account" button and then a confirmation popup will be opened and you can press "Confirm" to delete your account and log you out of the application
![image](https://user-images.githubusercontent.com/59605589/211030610-fddb6756-0e91-4ef9-8e97-4a7ecd369082.png)

## Add review to the game
* To add a review to a game you need to first find the game you want to review from the "Games" page (you can't review your own games) and then press the "View" button, go to the bottom of the page and there you can add your review on the left form and afterwards you can see it on the right
![image](https://user-images.githubusercontent.com/59605589/211030902-ea4d4258-9946-48a3-b9fc-3e412d6a83b0.png)
