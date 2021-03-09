import './util.js';
import './data.js';
import './popup.js';
import './form.js';
import {getArrayOffersNearby} from './data.js';
import './map.js';
import {setupForm} from './form.js';
import {renderOfferOnMap} from './map.js'

setupForm();
renderOfferOnMap(getArrayOffersNearby())
