import { Link, useHistory } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';
import '../styles/global.scss';
import {Button} from '../components/Button'
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import { ref } from '@firebase/database';
import { push } from 'firebase/database';

export function NewRoom(){
    const {user} = useAuth();
    const history = useHistory();
    const [newRoom,setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent){

        event.preventDefault();
        
        if(newRoom.trim() === '') {
            return;
        }

        const roomRef=  ref(database,"rooms");
        const fireBaseRoom = await push(roomRef, {
            title: newRoom,
            authorId: user?.id,
        });

        history.push(`/rooms/${fireBaseRoom.key}`);
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustraçãoo simbolanzdo perguntas e repostas" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real </p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h1>{user?.name}</h1>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                            onChange={event=> setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala já existente? <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}