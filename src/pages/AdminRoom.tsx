import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import logoImg from '../assets/images/logo.svg'
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { database } from "../services/firebase";
import "../styles/room.scss";
import { child, get, ref, remove, update} from "@firebase/database";
import { useRoom } from "../hooks/useRoom";
import { Question } from "../components/Question/index";
import deleteImg from "../assets/images/delete.svg";




type RoomParams= {
    id: string;
}


export function AdminRoom(){
    const params = useParams<RoomParams>();
    const roomId = params.id;
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

    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Tem certeza que você deseja excluir essa pergunta?')){
            var questionRef= ref(database, `rooms/${roomId}/questions/${questionId}`);
            remove(questionRef);
        }
    }

    async function handleEndRoom(){
        const roomRef = ref(database, `rooms/${roomId}`);
        update(roomRef, {
        endedAt: new Date(),
    });

    history.push("/");
    }

return(
    <div id="page-room">
        <header>
            <div className="content">
                <img src={logoImg} alt="Letmeask" />
                <div>
                    <RoomCode code={roomId}></RoomCode>
                    <Button onClick={() => handleEndRoom()} isOutlined>Encerrar Sala</Button>
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
                    >
                    <button type="button" onClick={ () => handleDeleteQuestion(question.id)}>
                        <img src={deleteImg} alt="Remover Pergunta" />
                    </button>    
                    
                    </Question>
                )
            })}
            </div>
        </main>
    </div>   
)}

