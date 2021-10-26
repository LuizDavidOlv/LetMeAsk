import {Button} from './components/Button'
import {ButtonChildren} from './components/ButtonChildren'
import {ButtonCounter} from './components/ButtonCounter'

function App() 
{
  return (
    <div>
      <Button text="Button 1"/>
      <ButtonChildren>Clique aqui!</ButtonChildren>
      <ButtonCounter />
    </div>
  );
}

export default App;
