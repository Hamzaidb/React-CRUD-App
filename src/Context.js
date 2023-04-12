import React from "react";
export const AppContext = React.createContext();
export const Provider = AppContext.Provider;

/*
Le fichier Context.js crée un contexte React appelé AppContext en utilisant 
la méthode createContext() fournie par React. 
Ce contexte est exporté pour être utilisé dans d'autres fichiers de l'application.

Le contexte AppContext peut être utilisé pour partager des données 
entre les différents composants de l'application React, 
sans avoir besoin de passer ces données explicitement à chaque composant 
à travers les propriétés (props).

Le Provider exporté est également créé à partir de AppContext.Provider et 
est utilisé pour envelopper la hiérarchie des composants avec le contexte. 
Cela permet aux composants enfants d'accéder aux données fournies par le contexte.
*/