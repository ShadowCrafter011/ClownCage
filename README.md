# Clown Cage

## Requirements

- NPM
- Visual Studio with the C++ workflow
- Python, if you want to use the generate command

## Setup

- Clone the git repository
- Navigate to the repositories root directory
- Run `npm install` there

For a one time build run `npm run build`. To continously watch for changes and rebuild when changes are made run `npm run dev`. This is useful for development.

To install the Chrome extension navigate to [chrome://extensions](chrome://extensions), make sure developer mode is active and click load unpacked extension. As the directory use the `dist` folder in the root directory. If no folder named dist exists make sure `npm run build` finished at least once without errors.

When developing don't forget to use `npm run dev` and every time you make a change you also need to reload the Chrome extension in [chrome://extensions](chrome://extensions).

## Contributing

To contribute to Clown cage you will mostly be adding and changing commands and plugins. Those are found in `src/commands` and `src/plugins` respectively.

### Adding commands/plugins

There is a simple way of generating scaffold code for commands and plugins. `npm run generate plugin/command [name] [id]` will generate either a plugin or command with the name and ID specified. The ID field is optional and will be substituted to 0 if none is specified. The name is to be given in upper camelcase. Meaning the first letter of each word is capitalized and words are not separated by anything. Eg. CloseMultipleTabs. The generator will automatically append Command/Plugin to the name.

IDs for each action can be found in the [Salbot ID list](https://salbot.ch/admin/idlist).

You'll find the file either in `src/plugins` or `src/commands`. It will have a Typescript extension `.ts` and be in snake case. The example above would translate to `close_multiple_tabs.ts`. Note that here plugin/command is not specified.

Your file will be also automatically imported into the specific `index.ts` and the class instantiated.

If you use the generator you'll NEVER need to update either `index.ts` files. Doing so might break the generator so it is not advised to do that.

### Context of commands/plugins

If you dug around in the code you might have noticed that the `ActionHandler` is instantiated twice with context "main" and "background". This just means that some actions are run in content scripts and some in the service worker.

This stems from the fact that content scripts do not have access to some powerful Chrome APIs like `chrome.tabs`. If your action needs to access those APIs message [ShadowCrafter011](mailto:lkoe@bluewi.ch) or make the changes yourself to the [seeds.rb](https://github.com/ShadowCrafter011/ClownCageWS/blob/clowncagev2/db/seeds.rb) file of the WebSocket backend. The downside of using "background" though is that you cannot access nor interact with the DOM. To bypass this you can send a message to a content script which will execute your action. This uses the [Chrome messaging API](https://developer.chrome.com/docs/extensions/mv3/messaging/).

### Globals

In `src/commands/command.ts` and `src/plugins/plugin.ts` there is a parent class defined from which every command/plugin inherits. If you find that A lot of commands/plugins use a function you may put inside the parent. Likewise if plugins and commands use the same function a lot you may put it in the top level `Action` class. You can find this class in `src/action.ts`.
