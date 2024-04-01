# News tracker : the tool for consulting newspaper around the world
This web application is part of our 1st year of Master 1 MIASHS in the connected data integration module.
It provides an interface that allows the user to select a country and access all the latest newspapers published. The user is also provided with complementary informations about the country.
Few informations about us are provided in the footer links, you can also access to an API documentation granted by Swagger (more details below).

## More about the data :
- The datas about News consists mainly of :
    - The article's name
    - The article's author
    - The article's date of publication
    - A link to the article
- The datas about country are :
    - Name of the country
    - The area
    - The population
    - The capitale

## Technologies involved in the project :

### Programming langages :
- HTML
- CSS
- JavaScript
### Environment :
- Node.js
### Framework :
-  Express.js
### Our APIs :
- [*News API*](https://newsapi.org/) provides us the datas about newspapers
- [*Country API*](https://restcountries.com) to link the newspapers data with country datas

## A quick guide to launch the App :
First, notice that you have to download the repository before launching and get an APIKEY [(more details)](#configure-apikey). There is 2 folders (*backend* & *frontend*) that you will have to run in two distinct terminal. This *"tutorial"* shows you the steps to follows in both folders.

### Step 1 : check the dependencies 
Once you are in the folder, ensures that all the packages are correctly installed and proceed to the following command in a terminal :

```bash
npm install
```
### Step 2 : Run the app 
You have to start the Backend Server **before** the Frontend visual, it might seem obvious but it's always good to remember that. Still in your terminal, run this :

```bash
npm run dev
```

### Step 3 : Access to the website 
Here is a few differences between the backend and the frontend.
Once you run the backend server you can access it with this url : [Backend server : News route](http://localhost:3000/api/news) or [Backend server : Country route](http://localhost:3000/api/info).
After that you may want to change the default settings of the query which is possible by adding a parameter to the URL. Here is an exemple for both :
```html
https://localhost:3000/api/news?country=uk

http://localhost:3000/api/info?codes=uk
```
But with these 2 URL you'll only get raw json. If you want to acces to the real website, you have to go here : [News Tracer](http://localhost:9090)

## The Swagger Documentation

There is 2 conditions to access to the documentation. You need a running server and the packages correctly installed, here is a command to run in terminal to ensures that :
```bash
npm install swagger-ui-express swagger-jsdoc --save
```
If you launched the server as indicated in previous section you can go the the following URL : [Documentation Swagger](http://localhost:3000/api-docs) 

## Configure APIKEY

### Create an API Key 
To get an API Key that allow you to use the app you only have few steps to follow :
- Go to [News API Website](https://newsapi.org/register)
- Create an account
- Copy the API key

### Save the key in a proper file

Here is a simple requirement to access the datas provided by the API : you have to create a .env file containing your API key with the format : *"APIKEY=your_api_key"*. Some command you may want to run to proceed so :
```bash
cd backend
touch .env
nano .env
```
You need to create the .env file in the backend folder (this is why the *cd* command). You use *touch* to create the file. I personnaly have a preference for *nano* to modify the file but you can also use *vim* or *echo*. 

## Testing the App
A last functionnality you may want to try is to test the App. Few are implemented et you can run them after launching the **backend** server. Here is the command :
```bash
npm test
```


