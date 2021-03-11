import './util.js';
import './data.js';
import './popup.js';
import './form.js';
import './map.js';
import {getArrayOffersNearby} from './data.js';
import {renderOfferOnMap, mapInitialize, disableForm} from './map.js'
import {setupForm} from './form.js';

setupForm();
renderOfferOnMap(getArrayOffersNearby());
disableForm ();
mapInitialize();
