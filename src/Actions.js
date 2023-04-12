// importe les hooks useEffect et useState de la bibliothèque React.
import { useEffect, useState } from "react";

//définit un composant fonctionnel nommé Actions qui ne prend pas de props en entrée.
export const Actions = () => {
   
 /*let [users, setUsers] = useState([]); : définit un state users 
qui est un tableau vide 
et une fonction setUsers pour mettre à jour ce state.*/
  let [users, setUsers] = useState([]);

    //userLength montre les données du chargement
  let [userLength, setUserLength] = useState(null);

  useEffect(() => {
    fetch("http://localhost/php-react/all-users.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUsers(data.users.reverse());
          setUserLength(true);
        } else {
          setUserLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /*
 insère un nouvel utilisateur dans la base de données 
 en effectuant une requête POST à l'API PHP. 
 Elle met également à jour le state users et userLength en conséquence.
  */
  const insertUser = (newUser) => {
    fetch("http://localhost/php-react/add-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.id) {
          setUsers([
            {
              id: data.id,
              ...newUser,
            },
            ...users,
          ]);
          setUserLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // active le mode édition pour un utilisateur donné en mettant à jour le state users
  const editMode = (id) => {
    users = users.map((user) => {
      if (user.id === id) {
        user.isEditing = true;
        return user;
      }
      user.isEditing = false;
      return user;
    });
    setUsers(users);
  };

  // annule le mode édition pour un utilisateur donné en mettant à jour le state users
  const cancelEdit = (id) => {
    users = users.map((user) => {
      if (user.id === id) {
        user.isEditing = false;
        return user;
      }
      return user;
    });
    setUsers(users);
  };

  // met à jour les informations d'un utilisateur donné en effectuant une requête POST à l'API PHP.
  const updateUser = (userData) => {
    fetch("http://localhost/php-react/update-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          users = users.map((user) => {
            if (user.id === userData.id) {
              user.isEditing = false;
              user.user_name = userData.user_name;
              user.user_email = userData.user_email;
              return user;
            }
            return user;
          });
          setUsers(users);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // supprime un utilisateur donné
  const deleteUser = (theID) => {
      /*La fonction deleteUser prend un argument theID qui représente 
      l'identifiant d'un utilisateur à supprimer de la liste des utilisateurs.
        
      Pour supprimer l'utilisateur, la fonction crée une nouvelle liste d'utilisateurs 
      userDeleted en utilisant la méthode filter() qui parcourt chaque utilisateur dans 
      la liste users et retourne un nouveau tableau contenant tous les utilisateurs qui 
      n'ont pas l'identifiant égal à theID.
        
      => la fonction filtre tous les utilisateurs qui ont un identifiant différent 
      de celui de l'utilisateur à supprimer. 
      Le tableau résultant userDeleted contient donc tous les utilisateurs sauf celui à supprimer.
      */
    let userDeleted = users.filter((user) => {
      return user.id !== theID;
    });
    // envoyer une requête au serveur pour supprimer l'utilisateur de la base de données
    fetch("http://localhost/php-react/delete-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // si la suppression de l'utilisateur réussit dans la base de données
        if (data.success) {
          setUsers(userDeleted);// mettre à jour la liste des utilisateurs en supprimant l'utilisateur supprimé
          // s'il n'y a plus aucun utilisateur, mettre la variable userLength à 0 pour afficher le message "No data found
          if (users.length === 1) {
            setUserLength(0);
          }
        } else {
          alert(data.msg);// afficher un message d'alerte si la suppression a échoué
        }
      })
      .catch((err) => {
        console.log(err);// afficher l'erreur s'il y en a une
      });
  };

  // retourne un objet contenant plusieurs méthodes et états qui seront utilisés dans d'autres parties de l'application
  return {
    users,
    editMode,
    cancelEdit,
    updateUser,
    insertUser,
    deleteUser,
    userLength,
  };
};

/*
users : L'état actuel de tous les utilisateurs récupérés depuis la base de données.
editMode : Une méthode qui active le mode édition pour un utilisateur spécifique.
cancelEdit : Une méthode qui annule le mode édition pour un utilisateur spécifique.
updateUser : Une méthode qui met à jour les informations d'un utilisateur spécifique dans la base de données et dans l'état users.
insertUser : Une méthode qui ajoute un nouvel utilisateur à la base de données et à l'état users.
deleteUser : Une méthode qui supprime un utilisateur spécifique de la base de données et de l'état users.
userLength : L'état qui indique si la récupération des utilisateurs depuis la base de données est en cours ou terminée.
*/