# GitHub Follower/Following Scraper

## Description 📄
This project is a simple web scraper that uses Puppeteer to retrieve a list of GitHub followers/following for a specified user. The script navigates to the GitHub profile page and extracts the follower/following names.

## Features ✨

- Uses Puppeteer for web scraping
- Fetches GitHub followers/following for a specified user
- Outputs the list of followers/following to the console

## Installation 🛠️

1. Clone the repository:

   ```sh
   git clone https://github.com/MuhammedMagdyy/web-scraping-github.git
   cd web-scraping-github
   ```

2. Install the required dependencies:

   ```sh
   npm install
   ```

3. Rename the `.env.example` to `.env` file in the root directory and add your GitHub username:
   ```env
   USER_NAME=your-github-username
   ```

## Usage 🚀

Run the script using the following command:

```sh
npm start
```

## Example for output 📋

```javascript
{
  followers: [
    'follower1',
    'follower2',
    'follower3',
    'follower4',
    'follower5'
  ],
  following: [
    'following1',
    'following2',
    'following3',
    'following4',
    'following5'
  ]
}
```

## Improvements and Future Work 🛠️

- Add a feature to save the output to a file
- Add a feature to fetch the list of repositories for a specified user
- Error handling for invalid usernames
- Implement pagination to handle users with many followers

And more!

## Contributing 🤝

Contributions are welcome! Feel free to open a pull request for improvements or suggestions or contact me on [LinkedIn](https://www.linkedin.com/in/muhammedmagdyy/).

## Contact 📬

For any inquiries, don't hesitate to get in touch with me at my [email](mailto:mohamedmagdy121@outlook.com) or connect with me on [LinkedIn](https://www.linkedin.com/in/muhammedmagdyy/).

Happy coding! :rocket:
