// design-system/components/index.d.ts importe 'react', mais ce dossier est hors
// du projet : TypeScript n'y trouve pas node_modules/@types/react. Ce module
// ambiant n'est utilisé que lorsque la résolution normale échoue (donc
// uniquement depuis le design system) et renvoie vers les types React du projet.
declare module 'react' {
  import React = require('@buildos/react-types');
  export = React;
}
