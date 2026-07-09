# Express + EJS Boilerplate

## What is TemplatrJS?

Minimal prototyping boilerplate:
- EJS templating
- Express server, EJS views with shared nav/footer partials, and a working contact form.

**Note: This is still under development. While it works, edge cases have not been tested and also the code may change suddenly.**

## Setup

```
npm install
npm run dev
```

Then open http://localhost:3000

Use `npm run dev` instead of `npm start` to auto-restart on file changes (uses Node's built-in `--watch`).

## How Do I Use It?

90% of the time you work in the `app/` folder for everything, except public files (e.g. CSS, JavaScript and images) which in the `public` folder. 

### Creating and editing views:

`app/views` contains the EJS files. `app.views/pages` is for the pages and is where Express will look when trying to load pages, so putting pages somewhere else may not work.
`app.views/components` is for partials which you want to include in pages but not have mixed in directly with the main page code, such as a nav or footer.
If you're not familiar with EJS, it's a simple HTML templating language. You can [learn more about EJS here](https://ejs.co/).

### Adding Routes

### Working With CSS, JavaScript and Images

#### CSS: Beer CSS

TemplatrJS uses [Beer CSS](https://www.beercss.com/) — a lightweight CSS framework built on Material Design 3. It provides components, layout utilities, and a consistent design system out of the box.

**Key things to know:**
- Use Beer CSS utility classes directly on HTML elements — e.g. `class="round border"`, `class="row gap"`, `class="responsive"`
- Forms use floating labels: put the `<label>` *after* the `<input>`, not before, and wrap both in `<div class="field label border">`
- `<b>` tags are styled as chips/badges by Beer CSS — use `<strong>` for bold text instead
- `<main class="responsive">` constrains page content to a readable max-width and centres it

Add custom overrides in `public/css/style.css`. It loads after Beer CSS so your rules take precedence.

See the [Beer CSS docs](https://www.beercss.com/) for the full component reference.

### Working With Models and SQL

https://sequelize.org/

#### Create a Table

You can technically define a table with Sequelize anywhere, however it's recommended you create it in a dedicated file in `app/models`. Have a look at `models/message.js`, `models/user.js` for an example of a simple model can look like.

```javascript
const Person = db.define('Message', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.STRING,
});
```

Because of how TemplatrJS works, you'll also need to register your model by adding it to `app/models/index.js`. For example, if you created a `Person` model it might look something like this:

```javascript
const Person = require('./person');
module.exports = { db, Person, ... };
```

Notes:
- Sequelize is only set up for SQLite currently as its designed primarily for prototyping. However, Sequelize does support other database systems. Check out the [Seqelize docs](https://sequelize.org/docs/v7/category/databases/) for more information.
- If you want to test changes without saving perminantly to a database, Sequelize supports saving to RAM so the changes will be cleared when you restart the app. To do this, update `storage` in `db.js` to be `':memory:'`
- While you can use the `models/` folder however you want, I'd recommend keeping it for SQL models and using something else, such as a services folder, for API calls etc. This is up to you, however.

### Controllers

Controllers are entirely optional. For quick and simple prototyping and experiments you have the option to just put your code in `routes.js` if you want to.
However, if you find this is becoming messy you can extract the logic out into 


### Handling Logins With Passport.js

Passport.js is set up, but you'll need to run `npm run init` to have it generate a `.env` file with a server key. Passport.js isn't needed for anything, so if you don't need any kind of auth then feel free to delete it.

Notes:
- Passport.js supports a range of log in types, but because TemplatrJS is designed for simplicity and prototyping it only supports email/password out of the box. Check out the Passport.js docs if you want to know how to implement other types.

### Services

- Not currently implemented 

### Working With Code Outside `app/` and `public/`

Code outside these files is generally related to basic setup and settings.

## Structure

```
app/
    routes.js              routes
    views/              EJS template files
        pages/
            home.ejs
            about.ejs
            contact.ejs
        components/       
            head.ejs
            nav.ejs
            footer.ejs
    models/               optional: SQL table definitions
    controllers/          optional: extract logic that doesn't belong in `routes.js`
    middleware.js         optional: currently only used for Passport.js
    services/             optional: API calls
public/
    css/style.css
```

## Adding a page

1. Create `app/pages/yourpage.ejs`, include the partials the same way `about.ejs` does.
2. Add a route in `routes.js`: `app.get('/yourpage', (req, res) => res.render('yourpage', { title: 'Your Page' }));`
3. Add a link in `nav.ejs`.

## Contact form

`POST /contact` in `routes.js` currently just logs the submission to the console and re-renders the page with a success message. Swap that block out for real handling (save to a database, send an email, call an API) when you're ready to go past prototype stage.
