# Discord.RSS
This is a fork of the nice [Discord.RSS](https://github.com/synzen/Discord.RSS) bot. It's slightly modified for hosting on [Glitch](https://glitch.com)
> Driven by the lack of comprehensive RSS bots available, I have decided to try my hand at creating one of my own. Designed with as much customization as possible for both users and bot hosters, while also (or should be) easy to understand.

> *synzen* ©

## Third-party services
For running this bot you will need to use some third-party services:
* MongoDB database hosting e.g [mLab](https://mlab.com) (actually you can use a databaseless variant, but MongoDB is the best choice).
* Server monitoring tool e.g [UptimeRobot](https://uptimerobot.com) (it's necessary to keep the bot alive, since it falls asleep after 5 minutes of his application inactivity).

## Invite the bot
Create a bot if you have not already done so and get its **CLIENT ID** and **TOKEN** on [Discord Developer Portal](https://discordapp.com/developers/applications)

Invite the bot to your server by following this link (replace `CLIENT_ID` with your **CLIENT ID**):
```
https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID&scope=bot&permissions=85056
```
You can edit the bot role permissions in the server settings later (e.g `Manage Roles` for `subme` command).

## Create a database
Create a database at AWS US East, add a user to it and get its **MongoDB URI** on [mLab](https://mlab.com)

## Install the bot
[Remix this project on Glitch](https://glitch.com/edit/#!/remix/discord-rss)

If you remix this project on Glitch, keep in mind that these files are not default:
* `config.json`
* `settings/commands.js`
* `settings/schedules/feed43.json`
* `settings/schedules/glitch.json`

If you need the default files, get them from the GitHub repo: [Discord.RSS](https://github.com/Chilace/Discord.RSS)

Or import the whole project from GitHub: [Import from GitHub into Glitch](https://glitch.com/edit/#!/import/github/Chilace/Discord.RSS?DRSS_BOT_TOKEN=&DRSS_DATABASE_URI=)

**Warning !!! Do not allow secrets/credentials to be publicly available.**

Do not specify bot token and db connection in configuration file (i.e `config.json`), use environment variables instead (i.e `.env` file).

After the bot is installed, fill the `.env` file with **TOKEN** and **MongoDB URI**:
```bash
# Environment Config

# store your secrets and config variables in here
# only invited collaborators will be able to see your .env values

# reference these in your code with process.env.SECRET

SECRET=
MADE_WITH=

# note: .env is a shell file so there can't be spaces around =
DRSS_BOT_TOKEN=TOKEN
DRSS_DATABASE_URI=MongoDB URI

```

## Setup server monitoring
Add HTTP(s) monitor with your project URL (https://PROJECT_DOMAIN.glitch.me) on [UptimeRobot](https://uptimerobot.com)

Optionally add Slack Alert Contact to monitor with your discord webhook URL with appended `/slack` at the end of it (https://discordapp.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN/slack)

## Configure the project
There is a file `watch.json` in this project, which disables automatic restart on editing files [FAQ](https://glitch.com/help/restart)

So if you want to restart the bot manually:
* Trigger a restart by editing `.trigger-rebuild` file, or
* Use the following **bookmarklet** to trigger a restart:
```js
javascript:(function() {
  var currFile = application.selectedFile();
  var triggerFile = application.files().filter(function (file) {
    return file.path() === ".trigger-rebuild";
  })[0];
  if (!triggerFile) {
    alert("Please create a file named '.trigger-rebuild'.");
    return;
  }
  application.selectedFile(triggerFile);
  application.selectedFilePromise.then(function () {
    application.editor().replaceRange(
      "rebuild", { line: 0, ch: 0 }, { line: 0, ch: 10 }
    );
    application.selectedFile(currFile);
  });
})()
```
A **bookmarklet** is a bookmark/favorite that has JavaScript code as its "URL". It lets you run scripts on the current page. Just create a bookmark and copy'n'paste the code above in its URL field.

Then configure the bot as stated in the original [WIKI](https://github.com/synzen/Discord.RSS/wiki)

## You are all set!
