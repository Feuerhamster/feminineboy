# 🎀 FeminineBoy.net
> An open source website and community blog dedicated to content for boys with a feminine gender expression.

🌐 **https://feminineboy.net**

💬 **https://discord.gg/aGceAbPQk4**

## 💻 TechStack
The website is build with Typescript, Express and a headless cms.
This makes server side rendering possible, which is very good for this type of website due to search engine optimization and client performance.

### 🛠️ Languages
- HTML
- CSS
- JavaScript
- [Typescript](https://www.typescriptlang.org/)
- [Pug (Jade)](https://pugjs.org/)

### 📦 Frameworks & Libraries
- Node.js
- [Express.js](https://expressjs.com/)
- [Directus-SDK](https://docs.directus.io/reference/sdk/)

### 📝 Headless CMS
The website uses [Directus.io](https://directus.io/) which is a self hosted open source [headless CMS](https://en.wikipedia.org/wiki/Headless_content_management_system) (they call it "open data platform") that is used to write and manage content on the website.
It makes the development a lot easier and faster because we do not have to write a backend.
It's also easier for our writers and moderators to maintain the content.

## 📁 Poject structure
- `/content` Markdown files with static text content that is used as for example the privacy or about page.
- `/docs` Markdown files with the project documentation.
- `/public` Static assets like css files or images that will be served by expressjs (express.static() middlewarre).
- `/src` The actual application source code written in Typescript.
    - `/routes` Typescript files with express routers that handle the web requests and render the views.
    - `/services` Typescript files with static classes that provide methods and functionalities like the content fetching.
    - `/types` Typescript files with type/interface definitions.
- `/templates` Pug template files that are used for other stuff like RSS feeds.
- `/views` Pug template files that are used to render the html website.
    - `/mixins` Reusable pug components (mixins)
    - `/partials` Parts for the base layout

## 📚 Further Documentation
- [Project setup for developers](/docs/setup.md)
- [Directus data structure & Setup](/docs/directus.md)
- [Contribution guidelines](/docs/contribution.md)

## ✋ Contribution
To help programming and contribution please note:
- You are familiar with web development and have at least intermediate skills with the used languages and frameworks.
- Follow the [contribution guidelines](/docs/contribution.md)

*A project by Feuerhamster - Provided by HamsterLabs*