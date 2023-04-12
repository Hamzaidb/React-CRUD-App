import { Provider } from "./Context";
import Form from "./components/Form";
import UserList from "./components/UserList";
import { Actions } from "./Actions";
import backgroundImage from './site-bg.jpg';

function App() {
  const data = Actions();
  return (
    <Provider value={data}>
      <div className="App">
        <h1>Liste des utilisateurs</h1>
        <div className="wrapper">
          <section className="left-side">
            <Form />
          </section>
          <section className="right-side">
            <UserList />
          </section>
        </div>
      </div>
    </Provider>
  );
}

export default App;