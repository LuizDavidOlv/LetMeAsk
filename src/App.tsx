import { BrowserRouter, Route } from "react-router-dom" //Pacote nao foi criado para typescript. Para contornar esse problema, foi adicionar mais um pacote(yarn add @types/react-router-dom -D) para expanção do pacote original.

import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"

function App() 
{
  return (
    // <div>
    //   <Button text="Button 1"/>
    //   <ButtonChildren>Clique aqui!</ButtonChildren>
    //   <ButtonCounter />
    // </div>
    <BrowserRouter>
    <Route path="/" exact component={Home}/>
    <Route path="/rooms/new" component={NewRoom}/>
    </BrowserRouter>
  );
}

export default App;
