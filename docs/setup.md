# Project setup for development

## Setup Directus
[Directus.io](https://directus.io/) is the self hosted headless CMS (they call it "open data platform") that is used to write and manage content on the website.
It is important that you have a correctly configured running instance, otherwise the code will not work as expected.

For more instructions see: [Directus Setup & data structure](/directus.md)

**Alternatively you can use the production Directus instance as in the default config.**

## Set up the project

### Installation
**Requirements:** Node.js 14 or higher, NPM and Git has to be installed on your computer.

1. Clone the GitHub repo / your fork.
2. Run `npm install` in the project root.
3. Run `tsc` in the project root to compile the typescript files.
4. Create the project configuration (see [configuration](#configuration)).
5. Run `npm start` and you are finished with the setup.

### Configuration
The project itself uses environment variables and .env files for configuration.

1. Create a file in the root directory named `.env`
2. Put the following in the file:
```dotenv
# The port for the express server
PORT = 7390
PUBLIC_URL = https://feminineboy.net

# Directus api configuration
DIRECTUS_ADDR = https://content.feminineboy.net/
# Optional directus token if you want to fetch content as an authenticated user
# DIRECTUS_TOKEN = *****

# Ackee analytics configuration
ACKEE_TRACKER = false
ACKEE_SERVER = false
ACKEE_DOMAIN_ID = false
ACKEE_DETAILED = false
```

## Set up Ackee
[Ackee](https://ackee.electerious.com/) is the privacy friendly analytics tool that is used to get usage stats for the website.

**In most cases it is not necessary to install Ackee for local development**, except if you want to change something related to that.

Visit Ackee's GitHub repo for more instructions: https://github.com/electerious/Ackee