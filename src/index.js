import Heading from './components/heading/heading.js';
import HelloWorldButton from "./components/hello-world-button/hello-world-button";
//this 'import' only works in "bundle.js" after this index.js file and other imported files have been bundled together using webpack

import addImage from "./add-image.js";

import React from "react";

const heading = new Heading();
heading.render('hello world');
const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();

if (process.env.NODE_ENV === 'production') {
	//when webpack builds in mode: 'production' it will compile this block
	console.log('Production mode');
}

if (process.env.NODE_ENV === 'development') {
	//when webpack builds in mode: 'development' it will compile this block
	console.log('Development mode')
	addImage();
}

helloWorldButton.methodThatDoesNotExist();