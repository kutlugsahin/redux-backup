!function(e){function t(n){if(r[n])return r[n].exports;var u=r[n]={i:n,l:!1,exports:{}};return e[n].call(u.exports,u,u.exports,t),u.l=!0,u.exports}var r={};t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});!function(e){e.REDUX_RESTORE_BACKUP_ACTION_TYPE="@@_REDUX_RESTORE/BACKUP",e.REDUX_RESTORE_RESTORE_ACTION_TYPE="@@_REDUX_RESTORE/RESTORE",e.REDUX_RESTORE_DELETE_ACTION_TYPE="@@_REDUX_RESTORE/DELETE"}(t.types||(t.types={}))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(2),u=r(6);t.backupState=u.backupState,t.restoreState=u.restoreState,t.deleteBackup=u.deleteBackup;var o=r(0);t.actionTypes=o.types,t.default=n.default},function(e,t,r){"use strict";function n(e,t){var r=i.initStore(e,t),n=a(r);return function(e,t){var r=n(t);return r?r(e,c(t)):void 0}}function u(e,t,r){var u=n(t,r);return function(t,r){return u(t,r)||e(t,r)}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),i=r(3),c=function(e){return e.payload},a=function(e){var t,r=(t={},t[o.types.REDUX_RESTORE_BACKUP_ACTION_TYPE]=e.backup,t[o.types.REDUX_RESTORE_DELETE_ACTION_TYPE]=e.deleteBackup,t[o.types.REDUX_RESTORE_RESTORE_ACTION_TYPE]=e.restore,t);return function(e){return r[e.type]}};t.default=u},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(4),u=function(e){return function(t){return function(r,n){var u=null;return e===n.reducerName&&(u=t(r,n)),u||r}}},o=function(e,t){var r=u(e);return{backup:r(t.backup),restore:r(t.restore),deleteBackup:r(t.deleteBackup)}};t.initStore=function(e,t){return void 0===t&&(t=new n.MemoryStore),o(e,t)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(5);t.MemoryStore=n.default},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(){this.backup=this.backup.bind(this),this.restore=this.restore.bind(this),this.deleteBackup=this.deleteBackup.bind(this),this.store={}}return e.prototype.backup=function(e,t){var r=t.label,n=void 0===r?"DEFAULT_BACKUP_LABEL":r;this.store[n]=JSON.stringify(e)},e.prototype.restore=function(e,t){var r=t.label,n=void 0===r?"DEFAULT_BACKUP_LABEL":r,u=this.store[n];return u?JSON.parse(u):e},e.prototype.deleteBackup=function(e,t){var r=t.label;r?this.store[r]=void 0:this.store={}},e}();t.default=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),u=function(e){return function(t,r){return{type:e,payload:{reducerName:t,label:r}}}};t.restoreState=u(n.types.REDUX_RESTORE_RESTORE_ACTION_TYPE),t.backupState=u(n.types.REDUX_RESTORE_BACKUP_ACTION_TYPE),t.deleteBackup=u(n.types.REDUX_RESTORE_BACKUP_ACTION_TYPE)}]);