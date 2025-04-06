import parse from 'html-react-parser';


const AiReplyFormate = ({text}:{text:string}) => {
    return (
        <div  className="prose !text-white">
            {parse(text)}
        </div>
    );
};

export default AiReplyFormate;