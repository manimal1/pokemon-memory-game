# Sequence memory game

The player has to pick the correct items in the order shown

## Introduction

This is a Fullstack technical test for a large organization.

For this test we want to see your skills and knowledge by developing a small and fun game: **Sequence memory game**.

We expect from you clean and well structured code.

## The Game

Each round adds one random item to the end of the sequence. When the sequence is finished the player has to click on the items in the order shown to pass to the next round.

### Example

We have 4 items, lets say: **Dog, Cat, Horse and Frog**:

* the **first round Cat is highlighted** and the **user should click on Cat** to pass to the next round.
* for the **second round Cat is highlighted and then Dog**, so the **user should click on Cat and then Dog**.
* for the **third round Cat is highlighted, then Dog and then Cat again** (because it is random, so items can be repeated), so the **user should click on Cat, then Dog and then Cat again** to pass to the next round.

This is a video of another example about this game but with colors: [youtube video](https://www.youtube.com/watch?v=1Yqj76Q4jJ4)

## Requirements

You should use this project to develop your solution and use **React with Redux**

For us is important that the candidates have **strong styling knowledge**, so no ui frameworks like bootstrap, material-ui, etc.

You can use your favourite style library/preprocessor such a **less, stylus, sass or any CSS-in-JS**...we use **[styled-components](https://www.styled-components.com/)**.

Please be sure to configure the **webpack.config.js** file for any tools you use.

The **items should be fetched from a public API** like [https://pokeapi.co/](https://pokeapi.co/). You can find many of them in the following repository: [Public APIs list](https://github.com/toddmotto/public-apis).

The API chosen should allow you to **fetch a specific number of items**. For example, with the **pokeapi** you can call `https://pokeapi.co/api/v2/pokemon?limit=9` which returns the first 9 pokemon. The number of items is up to you, but should be more than 3. You can use your favourite **library for fetching data**. We use **[axios](https://github.com/axios/axios)**.

**[Javascript standard style](https://standardjs.com/)** should also be installed and run each time you commit something. We want to see how you adapt your code by working with a different style guide.

## Bonus

* Animations
* Sounds
* Unit tests
* Data from **multiple APIs** and combining them

Additional features are very welcome :)

## How to run the project

* Install the dependencies by running `yarn install`
* Launch dev server by running `yarn start`
* To create the production bundle just run `yarn build`
* For any tests, run `yarn test`
