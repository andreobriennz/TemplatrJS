# Express + EJS Boilerplate

Minimal prototyping boilerplate: Express server, EJS views with shared nav/footer partials, and a working contact form.

## Setup

```
npm install
npm start
```

Then open http://localhost:3000

Use `npm run dev` instead of `npm start` to auto-restart on file changes (uses Node's built-in `--watch`).

## Structure

```
app/
    routes.js              routes
    pages/
      partials/
        head.ejs           <head> tag content (title, css link)
        nav.ejs             shared nav
        footer.ejs          shared footer
      home.ejs
      about.ejs
      contact.ejs           includes the form + POST handling result
public/
  css/style.css
```

## Adding a page

1. Create `app/pages/yourpage.ejs`, include the partials the same way `about.ejs` does.
2. Add a route in `routes.js`: `app.get('/yourpage', (req, res) => res.render('yourpage', { title: 'Your Page' }));`
3. Add a link in `nav.ejs`.

## Contact form

`POST /contact` in `routes.js` currently just logs the submission to the console and re-renders the page with a success message. Swap that block out for real handling (save to a database, send an email, call an API) when you're ready to go past prototype stage.
