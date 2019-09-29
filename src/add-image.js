import amiibo from './gityo_amiibo.jpg'

function addImage() {
	const img = document.createElement('img');
	img.alt = 'amiibo';
	img.width = 300;
	img.src = amiibo;

	const body = document.querySelector('body');
	body.appendChild(img);
}

export default addImage;