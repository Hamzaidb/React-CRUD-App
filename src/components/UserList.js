/*
Ce code définit un composant React appelé UserList. 
Il affiche une liste d'utilisateurs et permet à l'utilisateur de modifier 
ou de supprimer des entrées dans cette liste. 
*/

/*
Le code commence par importer deux hooks de React : useContext et useState. 
Il importe également un contexte appelé AppContext depuis un autre fichier nommé Context.js.
*/
import { useContext, useState } from "react";
import { AppContext } from "../Context";

/*
Le composant utilise le hook useContext pour accéder à des données et 
des fonctions stockées dans le contexte AppContext. 
Il utilise également le hook useState pour stocker les nouvelles données 
de l'utilisateur lorsqu'il modifie ses informations
*/
const UserList = () => {
  const {
    users,
    userLength,
    editMode,
    cancelEdit,
    updateUser,
    deleteUser,
  } = useContext(AppContext);

  // Storing users new data when they editing their info.
  const [newData, setNewData] = useState({});

/*La fonction saveBtn met à jour les données 
  de l'utilisateur en appelant la fonction updateUser stockée dans le contexte.*/
  const saveBtn = () => {
    updateUser(newData);
  };

/*La fonction updateNewData est appelée chaque fois que l'utilisateur modifie ses informations. 
Elle met à jour les nouvelles données de l'utilisateur stockées dans l'état local du composant. */
  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };


/*La fonction enableEdit est appelée lorsqu'un utilisateur souhaite modifier ses informations. 
Elle met à jour les nouvelles données de l'utilisateur stockées dans l'état local du composant et 
active le mode édition en appelant la fonction editMode stockée dans le contexte.*/
  const enableEdit = (id, user_name, user_email) => {
    setNewData({ id, user_name, user_email });
    editMode(id);
  };

/*La fonction deleteConfirm est appelée lorsqu'un utilisateur 
souhaite supprimer une entrée dans la liste. 
Elle affiche une boîte de dialogue de confirmation et supprime l'entrée si l'utilisateur confirme.*/
  const deleteConfirm = (id) => {
    if (window.confirm("Etes vous sûr?")) {
      deleteUser(id);
    }
  };


//Si les données des utilisateurs est nulle, alors le code entre parenthèses est exécuté
  return !userLength ? (
    <p>{userLength === null ? "Chargement..." : "Insérez un nouvel utilisateur"}</p>
// si ce n'est pas nul
  ) : (
    <table>
      <thead> 
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, user_name, user_email, isEditing }) => {
          return isEditing === true ? (
            <tr key={id}>
              <td>
                <input
                  type="text"
                  defaultValue={user_name}
                  onChange={(e) => updateNewData(e, "user_name")}
                />
              </td>
              <td>
                <input
                  type="email"
                  defaultValue={user_email}
                  onChange={(e) => updateNewData(e, "user_email")}
                />
              </td>
              <td>
                <button className="btn green-btn" onClick={() => saveBtn()}>
                  Sauvegarder
                </button>
                <button
                  className="btn default-btn"
                  onClick={() => cancelEdit(id)}
                >
                  Annuler
                </button>
              </td>
            </tr>
          ) : (
            <tr key={id}>
              <td>{user_name}</td>
              <td>{user_email}</td>
              <td>
                <button
                  className="btn default-btn"
                  onClick={() => enableEdit(id, user_name, user_email)}
                >
                  Modifier
                </button>
                <button
                  className="btn red-btn"
                  onClick={() => deleteConfirm(id)}
                >
                 Supprimer
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserList;

/*
Ce code est un composant React appelé "UserList" qui permet 
d'afficher une liste d'utilisateurs avec leurs noms et leurs adresses e-mail.
 Les utilisateurs peuvent être édités ou supprimés de la liste.

Le composant utilise le hook useContext() pour accéder 
au contexte AppContext, qui contient les données relatives à 
la liste d'utilisateurs et les fonctions nécessaires pour les mettre à jour ou les supprimer.

Le composant utilise également le hook useState() pour stocker 
les données de l'utilisateur modifiées lors de l'édition de son profil.

La fonction saveBtn() met à jour les données de l'utilisateur 
en utilisant la fonction updateUser() du contexte. 
La fonction updateNewData() met à jour les données de l'utilisateur modifié 
à chaque fois qu'un champ de saisie est modifié.

La fonction enableEdit() est appelée lorsqu'un utilisateur souhaite 
modifier ses informations et permet de remplir le formulaire avec 
les données actuelles de l'utilisateur. 
La fonction deleteConfirm() est appelée lorsqu'un utilisateur 
souhaite supprimer son compte et affiche une boîte de dialogue de confirmation.

Enfin, le composant affiche les données de chaque utilisateur 
dans un tableau HTML. Si un utilisateur est en train d'être édité,
 les champs de saisie sont affichés avec un bouton de sauvegarde 
 et un bouton d'annulation. Si un utilisateur n'est pas en train 
 d'être édité, les boutons Modifier et Supprimer sont affichés. 
 Si la liste d'utilisateurs est vide, le composant affiche un message 
 de chargement ou un message invitant l'utilisateur à ajouter un nouvel utilisateur.
*/