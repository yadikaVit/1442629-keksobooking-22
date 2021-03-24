import './util.js';
import './data.js';
import './popup.js';
import './form.js';
import './map.js';

import {mapInitialize, disableForm} from './map.js'
import {setupForm} from './form.js';

setupForm();

disableForm ();
mapInitialize();


import './server.js';
