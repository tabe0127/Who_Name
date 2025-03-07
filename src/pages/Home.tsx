import Image from "next/image";
import WhoName from '../assets/samples/WhoName.png'

export default function Home({ setSceneController }: { setSceneController : React.Dispatch<React.SetStateAction<string>> }){

  return(
    <>
    <Image src={WhoName} alt={"WhoName"} width={200} />
    <h2 className="text-2xl"><b><br />人間版ナンジャモンジャゲーム</b></h2><br />
    <p className="text-2xl">カードになるのはあなた自身!!</p><br />
    <p>※このアプリケーションではカメラを使用します。</p><br />
    <div style={{
        border: "2px dashed pink",
        padding: "10px",
        marginBottom: "20px"
      }}>
        <h2 className="text-2xl">〜ゲーム前の準備〜</h2><br />
        <ol style={{ listStyleType: "decimal", textAlign: "left", marginLeft: "20px" }}>
          <li>参加者で円になってください。</li>
          <li>準備ができたらゲームスタート！</li>
        </ol>
      </div>
    <button
      onClick={() => setSceneController('Name')}
      className="p-4 text-white font-bold bg-red-400 rounded-xl shadow-lg m-2"
    >
      新規ゲームスタート
    </button>
    </>
  )
}