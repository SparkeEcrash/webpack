import Heading from './components/heading/heading';
import AmiiboImage from './components/amiibo-image/amiibo-image';
import React from "react";


const heading = new Heading();
heading.render('Amiibo');
const amiiboImage = new AmiiboImage();
amiiboImage.render();
