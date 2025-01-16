import Image from "next/image";
import soraki from '../assets/samples/IMG_8278.jpg'
import tabe from '../assets/samples/IMG_8279.jpg'
import ise from '../assets/samples/IMG_8281.jpg'

export default function Home({ setSceneController }: { setSceneController : React.Dispatch<React.SetStateAction<string>> }){

  return(
    <>
    <h2 className="text-2xl">は、<b>人間版なんじゃもんじゃゲームです。</b></h2><br />
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