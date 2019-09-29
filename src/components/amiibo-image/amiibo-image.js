import Amiibo from './gityo_amiibo.jpg';
import './amiibo-image.scss';

class AmiiboImage {
	render() {
		const img = document.createElement('img');
		img.src = Amiibo;
		img.alt = 'Kiwi';
		img.classList.add('amiibo-image');

		const bodyDomElement = document.querySelector('body');
		bodyDomElement.appendChild(img);
	}
}

export default AmiiboImage;
