// bundle.js du design system lit React sur window au moment de son exécution :
// ce module doit être importé juste avant lui (voir lib/buildos.ts).
import * as React from 'react';

(window as unknown as { React: typeof React }).React = React;
