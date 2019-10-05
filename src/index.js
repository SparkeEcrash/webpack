// REQUIRED FOR RENDERING FONTAWESOME ICONS 
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
library.add(faSpinner);
dom.watch(); //this replaces any i elements with any fontawesome icons with svg elements

import Heading from './components/heading/heading.js';
import HelloWorldButton from "./components/hello-world-button/hello-world-button";
//this 'import' only works in "bundle.js" after this index.js file and other imported files have been bundled together using webpack

import addImage from "./add-image.js";

import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// this has been replaced by 
// @import "~bootstrap/scss/bootstrap";
// in index.scss
import "./index.scss";
// amiibo.html in the dist folder won't have index.scss and bootstrap stylings because
// amiibo.html never imports this file ('index.js')
// and as a result of these files there will be additional chunk called
// vendors~hello-world


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