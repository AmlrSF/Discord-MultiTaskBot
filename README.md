# Discord.js Bot - Readme

This is a Discord bot built using Discord.js version 14 and Node.js. The bot provides several slash commands to enhance the functionality of your Discord server. It includes commands such as retrieving user information, searching Wikipedia, telling dad jokes, providing images based on search, and generating random quotes. Additionally, it incorporates basic slash commands for welcoming new users and more.

## Installation

1. Clone or download the repository to your local machine.
2. Ensure you have Node.js installed (version 16.6.0 or higher is recommended).
3. Open a terminal or command prompt and navigate to the project directory.
4. Run the following command to install the required dependencies:

```bash
npm install
```

## Configuration

1. Rename the `.env.example` file to `.env`.
2. Open the `.env` file and provide the necessary values for the environment variables:

- `TOKEN`: Your Discord bot token. You can obtain this by creating a bot on the Discord Developer Portal.
- (Optional) `PREFIX`: The prefix to use for non-slash commands. If not provided, the default prefix is `!`.
- `DAD_JOKE_API`: The API endpoint for retrieving dad jokes. You can use "https://dad-jokes.p.rapidapi.com/random/joke".
- `WIKI_API`: The API endpoint for searching Wikipedia. You can use "https://en.wikipedia.org/w/api.php?action=query&list=search&sr".
- `FLICKR_API`: The API endpoint for searching images on Flickr. You can use "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=636e1481b4f3c446d26b8eb6ebfe7127&tags=".
- `QUOTE_API`: The API endpoint for generating random quotes. You can use "https://api.quotable.io/quotes/random".
- `MEME_API`: The API endpoint for retrieving memes. You can use "https://meme-api.com/gimme".

## Usage

To start the bot, run the following command:

```bash
npm start
```

The bot will initialize and connect to your Discord server. You should see a confirmation message indicating that the bot is online.

## Slash Commands

### /user

Retrieve information about a user.

Usage: `/user`

This command provides information about the user who executed the command. It displays details such as username, discriminator, user ID, avatar, and creation date.

### /wiki [search item] [limit]

Search for a term on Wikipedia.

Usage: `/wiki [search item] [limit]`

This command allows you to search for a specific term on Wikipedia. The `search item` parameter should be the term you want to search for. The optional `limit` parameter specifies the maximum number of search results to display. If not provided, it defaults to 5.

### /joke

Retrieve a random dad joke.

Usage: `/joke`

This command fetches a random dad joke using the Dad Joke API and sends it to the channel where the command was executed.

### /snap [image]

Search for an image using a keyword.

Usage: `/snap [image]`

This command searches for an image based on the provided keyword using the Flickr API and sends it to the channel. The `image` parameter should be the keyword you want to search for.

### /quote [tag]

Generate a random quote.

Usage: `/quote [tag]`

This command generates a random quote using the Quote API. You can optionally provide a `tag` parameter to specify a particular category or topic for the quote.

### /meme

Retrieve a random meme.

Usage: `/meme`



This command fetches a random meme using the Meme API and sends it to the channel where the command was executed.

## Basic Slash Commands

The bot also includes some basic slash commands to perform common tasks. These commands are:

- `/welcome [user]`: Sends a welcome message to the specified user. Replace `[user]` with the actual user mention or user ID.
- `/ping`: Checks the bot's latency and responsiveness.
- `/help`: Displays a help message listing all available commands.

## Contributing

Contributions to this project are welcome. If you find any bugs or have suggestions for new features, feel free to open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). You are free to modify and distribute the code as per the terms of the license.

## Acknowledgments

This bot was developed using Discord.js, a powerful library for creating Discord bots in Node.js. Special thanks to the developers of Discord.js and the Discord community for their contributions and support.
