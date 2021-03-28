'use strict';

import './util.js';
import './popup.js';
import './form.js';
import './map.js';
import './filter.js';
import './server.js';

import {mapInitialize, disableForm} from './map.js'
import {setupForm} from './form.js';

setupForm();
disableForm ();
mapInitialize();
