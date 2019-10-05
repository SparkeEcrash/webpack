import './heading.scss';
import $ from 'jquery';

class Heading {
	render(pageName) {
    // const h1 = document.createElement('h1');
    // const body = document.querySelector('body');
    // h1.innerHTML = 'Webpack is awesome. This is "' + pageName + '"page';
		// body.appendChild(h1);
		
		const h1 = $('<h1>');
		const body = $('body');
		const fontAwesome = $('<i>').addClass("fas fa-spinner fa-spin");
		h1.text('Webpack is awesome. This is "' + pageName + '" page');
		h1.append(fontAwesome);
		body.append(h1);
	}
}


{/* <i class="fas fa-spinner fa-spin"></i> */}
export default Heading;