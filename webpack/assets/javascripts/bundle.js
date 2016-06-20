require('expose?$!expose?jQuery!jquery');
require('jquery-ujs');
require('expose?_!lodash');
require('select2');
require('expose?jstz!jstz');
require('jquery.cookie');
require('script!../../../node_modules/patternfly/dist/js/patternfly.js');
require('expose?reactMounter!./react_app/common/MountingService');
window.tfm = {
  tools: require('./foreman_tools')
};
