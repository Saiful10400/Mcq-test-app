 

const Button = ({text,active,type,fn}:{text:string,active:boolean,type:"primary"|"secondary",fn?:()=>void}) => {
    return (
       type==="primary"?<button disabled={!active} onClick={fn} className="bg-[#f66b30] text-white font-semibold rounded-md text-xl py-2 px-2">{text}</button>:
       <button disabled={!active} onClick={fn} className="bg-red-500 text-white font-semibold rounded-md py-1 px-2">{text}</button>
    );
};

export default Button;