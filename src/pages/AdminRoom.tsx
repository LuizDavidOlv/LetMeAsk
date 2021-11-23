import { FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import logoImg from '../assets/images/logo.svg'
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import "../styles/room.scss";
import { child, get, push, ref} from "@firebase/database";
import { useRoom } from "../hooks/useRoom";
import { Question } from "../components/Question/index";



type RoomParams= {
    id: string;
}


export function AdminRoom(){
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const [newQuestion, setNewQuestion] = useState('');
    const {user} =useAuth();
    const history = useHistory();
    const { title, questions } = useRoom(roomId);


    useEffect(()=>{
    const dbRef= ref(database);

    get(child(dbRef, `rooms/${roomId}`)).then((room) => {
        if (!room.val()) {
          history.push("/");
        }
      });
    });

    

    async function handleSendQuestion(event: FormEvent){

        event.preventDefault();

        if(newQuestion.trim() === ''){
            return;
        }
        if(!user){
            throw new Error('You must be logged in');
        }

        const question={
            content: newQuestion,
            author:{
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        };

        const questionsRef = ref(database, `rooms/${roomId}/questions`);
        await push(questionsRef, question);

        setNewQuestion("");
    }

return(
    <div id="page-room">
        <header>
            <div className="content">
                <img src={logoImg} alt="Letmeask" />
                <div>
                    <RoomCode code={roomId}></RoomCode>
                    <Button isOutlined>Encerrar Sala</Button>
                </div>
            </div>
        </header>
        <main>
            <div className="room-title">
                <h1>Sala {title}</h1>
                {/* {questions.length>0 && <span>{questions.length} pergunta(s)</span> } */}
                { questions.length===1? (
                        <span>1 pergunta</span>
                    ) : (
                        <span>{questions.length} perguntas</span>
                    ) }
            </div>
            
            <div className="question-list">
            {questions.map(question => {
                return(
                    <Question
                        key={question.id}
                        content={question.content}
                        author={question.author}
                    />
                )
            })}
            </div>
        </main>
    </div>   
)}
