JobHive
JobHive is a job search platform that allows users to search for job listings based on their preferred job title and location. The platform uses the Adzuna API to fetch job listings and displays them in a user-friendly interface. Users can also save job listings to their account for future reference.

![Screenshot 2023-04-22 175800](https://user-images.githubusercontent.com/119772573/233808287-7b5b6736-2062-4a66-a9c6-99ae708d5b48.png)


## Technologies Used
- React
- Firebase Authentication
- Adzuna API
- Bootstrap
- Moment.js
- Features
- Search for job listings based on job title and location
- View job details and apply for jobs through external links
- Save job listings to user account for future reference
- Authentication and authorization using Firebase Authentication
- Pagination for job listings

## Installation
- Clone the repository
- Install dependencies using 
```console
npm install
```
- Create a 
- .env
 - file in the root directory and add the following variables:
- REACT_APP_APPID: Your Adzuna API App ID
- REACT_APP_APPKEY: Your Adzuna API App Key
- REACT_APP_FIREBASE_API_KEY: Your Firebase API Key
- REACT_APP_FIREBASE_AUTH_DOMAIN: Your Firebase Auth Domain
- REACT_APP_FIREBASE_PROJECT_ID: Your Firebase Project ID
- Start the development server using 

```console
npm start
```
## Usage
- Enter a job title and location in the search bar and click "Search"
- Browse through the job listings and click on a job to view more details
- Click "More Details" to apply for the job through an external link
- Click "Save" to save the job listing to your account
- Click "Login" to sign in to your account or "Register" to create a new account
- Click "Saved Jobs" to view your saved job listings

