import { useState, useContext } from "react";
import { AppContext } from "../Context";
const Form = () => {
// Obtenir la fonction d'insertion de l'utilisateur depuis le contexte global.
  const { insertUser } = useContext(AppContext);

  // Initialiser un nouvel objet utilisateur.
  const [newUser, setNewUser] = useState({});

  // Stocker les données du formulaire d'insertion de l'utilisateur.
  const addNewUser = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e.target.value,// Enregistrer la nouvelle valeur pour un champ donné.
    });
  };

  // Insérer un nouvel utilisateur dans la base de données.
  const submitUser = (e) => {
    e.preventDefault();// Empêcher le comportement par défaut de la soumission du formulaire.
    insertUser(newUser);// Insérer le nouvel utilisateur en utilisant la fonction d'insertion obtenue du contexte global.
    e.target.reset();// Réinitialiser le formulaire.
  };

  // Rendre le formulaire d'insertion de l'utilisateur.
  return (
    <form className="insertForm" onSubmit={submitUser}>
      <h2>Insérer un utilisateur</h2>
      <label htmlFor="_name">Nom</label>
      <input
        type="text"
        id="_name"
        onChange={(e) => addNewUser(e, "user_name")}
        placeholder="Enter name"
        autoComplete="off"
        required
      />
      <label htmlFor="_email">Email</label>
      <input
        type="email"
        id="_email"
        onChange={(e) => addNewUser(e, "user_email")}
        placeholder="Entrer l'adresse email"
        autoComplete="off"
        required
      />
      <input type="submit" value="Insérer" />
    </form>
  );
};

export default Form;

/*Ce code est un composant React qui représente un formulaire pour 
insérer un utilisateur dans une base de données. 
Il utilise deux hooks de React: useState et useContext.

La première ligne importe ces deux hooks de la bibliothèque react, 
ainsi que le contexte AppContext provenant d'un fichier ../Context.

La deuxième ligne utilise le hook useContext pour 
extraire la fonction insertUser du contexte AppContext. 
Cette fonction est appelée plus tard pour insérer le nouvel utilisateur dans la base de données.

La troisième ligne utilise le hook useState pour initialiser 
un nouvel objet newUser vide et pour mettre à jour cet objet 
lorsque l'utilisateur remplit le formulaire.

La fonction addNewUser est appelée à chaque fois que 
l'utilisateur remplit un champ du formulaire. 
Cette fonction met à jour l'état newUser en utilisant 
la syntaxe de spread operator (...) pour cloner l'objet newUser et 
ajouter la nouvelle valeur de champ dans la propriété correspondante.

La fonction submitUser est appelée lorsque l'utilisateur 
soumet le formulaire. Cette fonction empêche le comportement 
par défaut de l'événement (e.preventDefault()) pour éviter que 
la page ne soit rechargée, appelle la fonction insertUser pour 
insérer le nouvel utilisateur dans la base de données, puis 
réinitialise le formulaire.

Enfin, le code retourne un élément <form> avec deux champs <input> 
pour le nom et l'email de l'utilisateur, ainsi qu'un bouton pour 
soumettre le formulaire. Les événements onChange sont utilisés pour 
appeler la fonction addNewUser à chaque fois que l'utilisateur entre 
des valeurs dans les champs. L'événement onSubmit est utilisé pour 
appeler la fonction submitUser lorsque l'utilisateur soumet le formulaire.
*/