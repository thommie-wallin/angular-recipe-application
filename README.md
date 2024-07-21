# Angular Recipe Application ![Static Badge](https://img.shields.io/badge/v18.1.1-blue?logo=angular&logoColor=%23de3641&label=Angular) [![Netlify Status](https://api.netlify.com/api/v1/badges/482773ac-8862-49a4-98a1-24ad250a75e4/deploy-status)](https://app.netlify.com/sites/angular-recipes-application/deploys)

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Screenshots](#screenshots)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Configuration](#configuration)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Contributing](#contributing)
10. [License](#license)
11. [Contact](#contact)

## Overview

Search for recipes by browsing different food categories. Save your favourite recipes, or create your own recipes and organize them in a list.

## Features

- Present recipes from an recipe API in a list to browse through.
- Filter the recipes from an API using different categories for meal types and allergenes.
- Display more information about a recipe with a specific route for that recipe.
- Save/delete a recipe to/from a favourites list.
- Responsive to different display eg. mobile.
- Ingredient autocomplete search.
- Recipe creation and editing.
  <!-- - User authentication -->
  <!-- - API integration for recipe and ingredient data -->

## Description

![Static Badge](https://img.shields.io/badge/v18.1.1-blue?logo=angular&logoColor=%23ffab2e&label=Angular%20Material)
![Static Badge](https://img.shields.io/badge/v7.8.0-blue?logo=reactivex&logoColor=B7178C&label=RxJS)

This recipe app is an easy way for users who need to get ideas and tips for what to eat in minimum amount of time, and without many prerequisites for what to search for. The project started with the simple idea to let users browse for recipes from a recipe API and collect them in one list.

When starting this project I wanted to further my knowledge of Angular and how to connect it to an external API. Create an easy to use web app to clearly display the request data, and allow for users to organize a list of favourite recipes. To extend the available recipes to search for, I added the possibility to seamlessly switch to another API, and the possiblity to add more APIs in the future. If the user would like to add their own recipes to a list, there's a possibility to create a recipe with instructions and ingredients from an API.

<div align="center" style="display: flex; justify-content: center; align-items: center; width: 100%">
  <img align="left" src="./src/assets/images/frontpage-browse.png" width="30%">
  <img src="./src/assets/images/frontpage-favourites.png" width="30%">
  <img align="right" src="./src/assets/images/frontpage-create.png" width="30%">
</div>

## Getting Started

### Dependencies

- Node.js (version >=18.19.0).

### Installing

- Clone/download repository.
- Modify the template file .env.example with your own API keys and rename the file to .env
- Install dependencies in root folder:

```
cd [PROJECT NAME]
npm install
```

- Install the Angular CLI globally:

```
npm install -g @angular/cli
```

### Executing program

- In project root folder

```
npm start
```

or

```
ng serve
```

## Launch

[Angular Recipe Application](https://angular-recipes-application.netlify.app)

## Acknowledgments

- [Spoonacular](https://spoonacular.com/food-api)
- [Edamam](https://www.edamam.com/)
