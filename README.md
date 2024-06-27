# GitHub Scraper

## Table of Contents 📜

- [Description](#description-)
- [Features](#features-)
- [Installation](#installation)
- [Usage](#usage-)
- [Examples](#example-output-for-a-specific-choice-)
- [Improvements and Future Work](#improvements-and-future-work)
- [Demo](#demo-)
- [Contributing](#contributing-)
- [Contact](#contact-)

## Description 📄

This project involves developing a web scraper using Puppeteer to retrieve various features from a specified GitHub user profile, such as the number of followers, following, etc... The script is designed to navigate the user's GitHub profile page and systematically extract the desired information based on user-specified criteria.

## Features ✨

- Uses Puppeteer for web scraping and Inquirer for user input
- Fetches GitHub user profile information such as the number of followers, following, etc...
- Outputs the list of followers or following based on user choice

## Installation 🛠️

Please ensure you have [Node.js](https://nodejs.org/en/download/) installed on your machine.

1. Clone the repository:

   ```sh
   git clone https://github.com/MuhammedMagdyy/web-scraping-github.git
   cd web-scraping-github
   ```

2. Install the required dependencies:

   ```sh
   npm install
   ```

## Usage 🚀

Run the script using the following command:

```sh
npm start
```

Then you will be prompted to enter the GitHub username you want to scrape, and then you will be asked to choose the information you want to retrieve (followers, following, etc...).

## Example output for a specific choice 📋

Assuming the user name is `example-user` and the user chooses to retrieve the list of followers, the output will be:

```
==============================================
    GitHub Profile Information for example-user
==============================================
Username: example-user
Full Name: Example User
Bio: Example bio
Location: Cairo, Egypt
Company: Example Company
----------------------------------------------
Fetching followers from GitHub...
['follower1', 'follower2', 'follower3', 'follower4', 'follower5']
✅ Followers fetched successfully.
```

## Improvements and Future Work 🛠️

- Add a feature to save the output to a file 🔄
- Add a feature to fetch the list of repositories for a specified user 🔄
- Add a feature to fetch the list of starred repositories for a specified user 🔄
- Add a feature to fetch the list of organizations for a specified user 🔄
- Error handling for invalid usernames ✅
- Implement pagination to handle users with many followers 🔄

And more!

## Demo 🎥

https://github.com/MuhammedMagdyy/web-scraping-github/assets/60513866/5c09b2db-a055-47b0-aa46-4835c4784701

## Contributing 🤝

Contributions are welcome! Feel free to open a pull request for improvements or suggestions or contact me on [LinkedIn](https://www.linkedin.com/in/muhammedmagdyy/).

## Contact 📬

For any inquiries, don't hesitate to get in touch with me at my [email](mailto:mohamedmagdy121@outlook.com) or connect with me on [LinkedIn](https://www.linkedin.com/in/muhammedmagdyy/).

Happy coding! :rocket:
