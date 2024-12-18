import Image from "next/image";
import soraki from '../assets/samples/IMG_8278.jpg'
import tabe from '../assets/samples/IMG_8279.jpg'
import ise from '../assets/samples/IMG_8281.jpg'

export default function Start({ setSceneController }: { setSceneController : React.Dispatch<React.SetStateAction<string>> }){
  const sceneTransition = (scene: string) => {
    setSceneController(scene)
  }

  return(
    <>
    <h2 className="text-2xl">は、<b>人間版なんじゃもんじゃゲームです。</b></h2><br />
    <h2 className="text-2xl">ゲーム前の準備</h2><br />
    <ol style={{ listStyleType: "decimal" , textAlign: "left", marginLeft: "20px" }}>
        <li>いろんなポーズで自分の写真と本名をアップロードします。</li>
        <li>4人以下なら1人3枚、5人以上なら1人2枚推奨</li>
        <li>全員分の写真とが集まったらゲームスタート！</li>
        <div className="flex">
          <Image src={soraki} alt={"soraki"} width={110}  />
          <Image src={tabe} alt={"tabe"} width={110} />
          <Image src={ise} alt={"ise"} width={110} />
        </div>
    </ol>
    <h2 className="text-2xl">ゲームのルール</h2><br />
    <ol style={{ listStyleType: "decimal" , textAlign: "left", marginLeft: "20px" }}>
        <li>一人ずつ順番にNextボタンを押して写真を一枚めくるのを繰り返します。</li>
        <li>めくった写真が初めて出る写真なら、めくった人は写真に写っている人に<b>名前に関連するあだ名</b>をつけます。</li>
        <li>次の人も同じようにして写真をめくり、初めて出る写真であれば写っている人に<b>名前に関連するあだ名</b>つける、というのが基本的な流れです。</li>
        <li>もしめくった写真が初めて出るものでなく、すでに誰かがあだ名をつけた写真だったら、そのあだ名を叫びます。</li>
        <li>一番早く正確にあだ名を言えた人が、勝ち！</li>
        <li>もし誰もあだ名を正確に思い出せない場合は、その写真にまた新しいあだ名をつけてゲームを続行しましょう。</li>
    </ol>
    <button
      onClick={() => sceneTransition('Name')}
      className="p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg m-2"
    >
      新規ゲームスタート
    </button>
    </>
  )
}