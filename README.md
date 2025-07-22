# Morocco Travel Website

This project is a lightweight static site showcasing Morocco travel experiences. It uses plain HTML, CSS and a bit of vanilla JavaScript to render placeholder data stored in JSON files. All content can be edited without any build tools.

## Getting Started
1. Open `index.html` in any modern browser. The pages work entirely offline.
2. Data is loaded from the `data/` folder so changes are reflected on refresh.

## Editing Data
- `data/en/`, `data/fr/` and `data/es/` contain sample JSON for tours, activities, accommodations, blog posts, testimonials and FAQs.
- Replace the placeholder text and image URLs with your real content. Each file holds an array of objects following the schema in the comments at the top of the file.
- You can add more languages by copying one of the folders and updating the paths in `script.js`.

## Turning Off Randomization
The homepage shuffles the data arrays so different items show on each load. To disable this behaviour remove the `shuffle` calls in `script.js`.

## Adding New Categories
To add a new listing type, create a new JSON file inside `data/<lang>/` and add a matching grid container in the HTML. Implement a small `createCard` function in `script.js` to render the new cards.

## Features
- Hero banner with video background
- Randomized Featured Tours, Activities and Accommodations
- Testimonials slider and FAQ accordion
- Simple search on the Tours page
- Responsive layout and sticky WhatsApp button

Feel free to adapt the code to hook up a headless CMS or expand the sections as you see fit.
