import axios from "axios";
import { Bot, Send, User } from "lucide-react";
import { useEffect, useState } from "react";
import robotGif from "../assets/robot.gif";
import AiReplyFormate from "../components/AiReplyFormate";

type tChat = {
  ai?: string;
  user: string;
  timeStamp?: string;
};

const Ai = () => {
  const [chat, setChat] = useState<tChat[]>([]);
  const [textAreaheight, setTextAreaHeight] = useState(48);
  const [inputText, setInputText] = useState<string | null>(null);

  const inputFieldHandle = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const scrollHeight = e.currentTarget.scrollHeight;
    setTextAreaHeight(scrollHeight);
    const inputText = e.currentTarget.value;
    setInputText(inputText);
    if (inputText.length <= 71) {
      setTextAreaHeight(48);
    }
  };

  const promptSubmitHandle = async () => {
    if (!inputText) return;

    setChat((p) => {
      return [...p, { user: inputText }];
    });
    setInputText(null);
    setTextAreaHeight(48);
    const data = await axios.get(
      `https://mcq-test-server.vercel.app/api/result/ai?prompt=${inputText}`
    );

    setChat((p) => {
      p[p.length - 1].ai = data.data?.data.ai;
      p[p.length - 1].timeStamp = data.data?.data.timeStamp;
      return [...p];
    });
  };

  // chat ref handle.

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // Use 'auto' for instant scroll
    });
  }, [chat]);

  return (
    <div className="min-h-[70vh] pb-28">
      {chat.length === 0 ? (
        <div className="flex justify-center items-center flex-col  mt-24">
          <img className="w-[250px] " src={robotGif} alt="" />
          <h1 className="w-[85vw] text-center mx-auto font-medium text-gray-500">
            আমি পিকু। যেকোনো জিজ্ঞাসায় আমি তোমার পাশে আছি!
          </h1>
        </div>
      ) : (
        <div>
          {chat?.map((item: tChat, idx: number) => {
            return (
              <div key={idx}>
                <div className="flex justify-end items-end">
                  <div className="chat chat-end w-full">
                    <div className="chat-bubble chat-bubble-warning bg-[#f14545] text-white min-w-[50vw]">
                      <p className=" pr-3">{item.user}</p>
                    </div>
                  </div>
                  <span className="w-[35px] h-[35px] rounded-full border border-white bg-[#f14545] text-white flex justify-center items-center p-1">
                    <User />
                  </span>
                </div>

                <div className="flex justify-start items-end my-2">
                  <span className="w-[35px] h-[35px] rounded-full border border-white bg-[#fa7317] text-white flex justify-center items-center p-1">
                    <Bot />
                  </span>
                  <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-warning font-normal bg-[#fa7317] text-white min-w-[50vw]">
                      {item.ai ? (
                        <AiReplyFormate text={item.ai} />
                      ) : (
                        <span className="loading loading-dots loading-xl"></span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="fixed bottom-[68px] left-0 z-10 w-full flex items-center gap-2 bg-gray-200 pr-2 pl-1">
        <textarea
          value={inputText || ""}
          placeholder="তোমার প্রশ্নটা লিখো এখানে…"
          style={{ height: textAreaheight + "px" }}
          onInput={inputFieldHandle}
          className="w-full rounded-md border border-[#f66b30] pl-1 pt-1"
        ></textarea>
        <button type="submit" onClick={promptSubmitHandle}>
          <Send className="text-[#f66b30]" />
        </button>
      </div>
    </div>
  );
};

export default Ai;
