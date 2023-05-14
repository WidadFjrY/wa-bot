
# WhatsApp Bot With NodeJS

Welcome to the WhatsApp Bot project using Node.js! This project aims to develop a bot that can be used on WhatsApp with several exciting features, including YouTube downloader, Instagram, TikTok, and more.

Node.js serves as the powerful development platform for this project. By utilizing Node.js, you can create efficient and responsive network applications. The WhatsApp bot we will build will be capable of responding to received messages and performing specified tasks.

One of the main features we will implement is the YouTube downloader. This feature allows users to send YouTube video links to the bot through WhatsApp messages, and the bot will download the videos in the desired format. Additionally, we will also incorporate Instagram, TikTok, and other features that can be further developed according to the project's requirements.

Please follow the instructions and documentation provided to get started with this WhatsApp Bot, featuring various exciting capabilities. Happy coding!


## Table of Content

- [Getting Started](#getting-Started)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)


## Getting Started

 - [NodeJs Latest](https://nodejs.org/en)



## Deployment

To deploy this project run

- Clone this repository
```bash
git clone https://github.com/WidadFjrY/wa-bot.git
```
Clone the project repository to your local machine. 

- Install Dependencies

```bash
  cd wa-bot
  npm i
```

- If running it for the first time, scan the barcode using the WhatsApp app on your mobile device.

- And boom, the WhatsApp bot is ready to be used!

Notes : If you would to use Instagram downloader, before that add your instagram cookie in environment variable on your operating system, with variable INSTAGRAM_COOKIE
## Documentation
Once you have successfully logged in using the QR code, you can send chats to that phone number.

Send this message to your WhatsApp Bot

#### Get Notes


| Commands | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/notes` | `string` | To retrieve the list of available commands. |

#### Get YouTube

| Commands | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `/ytmp4 <link YouTube>`      | `string` | To download a video from YouTube in MP4 format. |
| `/ytmp3 <link YouTube>`      | `string` | To download a video from YouTube in MP3 format. |

#### Get Instagram

| Commands | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `/igdown <link YouTube>`      | `string` | To download a feed or reels from Instagram. |
| `/igstories <ig_usename>`      | `string` | To download Instagram stories using a username. |


#### Get Tiktok Whitout Watermark

| Commands | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `/ttdown <link tiktok>`      | `string` | To download a video from Tiktok whitout watermark. |

Notes : TikTok stories and TikTok photos are not yet supported.

#### Convert Images Into WhastApp Sticker

| Commands | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `/imgtostkr <with images>`      | `string and images` | To convert an image to a WhatsApp sticker. |


## Contributing

We greatly appreciate contributions from developers to enhance the WhatsApp Bot project. If you would like to contribute, please follow these steps:

- Fork this repository to your GitHub account.
- Clone the forked repository to your local machine.
```bash
git clone https://github.com/WidadFjrY/wa-bot.git
```
- Create a new branch for the feature or fix you will be working on
```bash
git checkout -b new-feature
```
- Make the necessary code changes as per the requirements.
- Ensure that you have performed testing to ensure there are no new errors or bugs.
- Commit the changes you have made.
```bash
git commit -m "Add new feature"
```
- Push the changes to the branch on your GitHub repository.
```bash
git push origin new-feature
```
- Create a pull request (PR) to the main repository. Provide a brief explanation of the changes you made.
- The development team will review your PR and provide feedback as soon as possible.

Please make sure to maintain open communication and follow the contribution guidelines established in this project. For any issues or further questions, please open an issue on the repository or contact the development team using the contact information provided below.

## Contact
If you have any questions or would like to directly get in touch with the development team, please use one of the following methods:

- Email: widadzdadz@gmail.com
## License

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)

