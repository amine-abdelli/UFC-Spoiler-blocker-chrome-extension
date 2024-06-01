# UFC Spoiler Blocker

## Description

UFC Spoiler Blocker is a Chrome extension designed to help you avoid spoilers from UFC-related content on YouTube. By automatically hiding video titles from specified UFC-related channels, this extension ensures you can browse YouTube without encountering unwanted spoilers.

## Features

- **Automatic Title Hiding**: Automatically hides video titles from a predefined list of UFC-related YouTube channels.
- **Channel URL Matching**: Works on both the main channel page and any subpages to ensure comprehensive title hiding.
- **Throttle for Efficiency**: Uses a throttling mechanism to ensure smooth performance even while scrolling.
- **MutationObserver Integration**: Monitors the page for dynamic content loading to keep titles hidden as new videos are added.

## Installation

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Once installed, the extension will automatically hide video titles from the specified UFC-related YouTube channels.
2. You can customize the list of channels to hide by editing the `channelsToHide` array in the `content.js` file.

## Contributing

We welcome contributions! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
