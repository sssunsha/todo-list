# todo-list
Todo list


sample demo: https://github.com/ngrx/example-app

fix below issues:
---------------------------------------------------
ERROR in ./node_modules/oauth/lib/oauth.js
Module not found: Error: Can't resolve 'crypto' in 'C:\workspace\personal\workspace\todo-list\node_modules\oauth\lib'
ERROR in ./node_modules/oauth/lib/oauth2.js
Module not found: Error: Can't resolve 'crypto' in 'C:\workspace\personal\workspace\todo-list\node_modules\oauth\lib'
ERROR in ./node_modules/oauth/lib/oauth.js
Module not found: Error: Can't resolve 'http' in 'C:\workspace\personal\workspace\todo-list\node_modules\oauth\lib'
ERROR in ./node_modules/oauth/lib/oauth2.js
Module not found: Error: Can't resolve 'http' in 'C:\workspace\personal\workspace\todo-list\node_modules\oauth\lib'
ERROR in ./node_modules/evernote/lib/thrift/transport/binaryHttpTransport.js
Module not found: Error: Can't resolve 'https' in 'C:\workspace\personal\workspace\todo-list\node_modules\evernote\lib\thrift\transport'
ERROR in ./node_modules/oauth/lib/oauth.js
Module not found: Error: Can't resolve 'https' in 'C:\workspace\personal\workspace\todo-list\node_modules\oauth\lib'
ERROR in ./node_modules/oauth/lib/oauth2.js
Module not found: Error: Can't resolve 'https' in 'C:\workspace\personal\workspace\todo-list\node_modules\oauth\lib'
------------------------
node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js

file and do the following change,

`node: {crypto: true}`