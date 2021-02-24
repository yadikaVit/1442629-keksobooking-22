import './util.js';
import './data.js';
import './popup.js';
import {getArrayOffersNearby} from './data.js';
import {renderOffer} from './popup.js';
import './form.js';

getArrayOffersNearby();
renderOffer(getArrayOffersNearby()[0]);


