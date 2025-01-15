import Image from "next/image";
import soraki from '../assets/samples/IMG_8278.jpg'
import tabe from '../assets/samples/IMG_8279.jpg'
import ise from '../assets/samples/IMG_8281.jpg'

export default function Home({ setSceneController }: { setSceneController : React.Dispatch<React.SetStateAction<string>> }){

  return(
    <>
    <h2 className="text-2xl">は、<b>人間版なんじゃもんじゃゲームです。</b></h2><br />
    <h2 className="text-2xl">ゲーム前の準備</h2><br />
    <ol style={{ listStyleType: "decimal" , textAlign: "left", marginLeft: "20px" }}>
        <li>参加者で円を作ります。</li>
        <li>いろんなポーズで右隣の人の写真を撮影し、その写真と本名を1台のスマホでアップロードします。その際、4人以下なら1人3枚、5人以上なら1人2枚撮ります。</li>
        {/* <li>4人以下なら1人3枚、5人以上なら1人2枚撮ります。</li> */}
        <li>2.が完了したら、右隣の人にスマホを渡します。</li>
        <li>スマホを受け取った人は2.〜3.を同様に行います。</li>
        <li>全員分の写真が集まったらゲームスタート！</li>
        <div className="flex">
          <Image src={soraki} alt={"soraki"} width={110}  />
          <Image src={tabe} alt={"tabe"} width={110} />
          <Image src={ise} alt={"ise"} width={110} />
        </div>
    </ol>
    <h2 className="text-2xl mt-5">ゲームのルール</h2><br />
    <ol style={{ listStyleType: "decimal" , textAlign: "left", marginLeft: "20px" }}>
        <li>一人ずつ順番にNextボタンを押して写真を一枚めくるのを繰り返します。</li>
        <li>めくった写真が初めて出る写真なら、めくった人は写真に写っている人に<b>名前に関連するあだ名</b>をつけます。</li>
        <li>次の人も同じようにして写真をめくり、初めて出る写真であれば写っている人に<b>名前に関連するあだ名</b>つける、というのが基本的な流れです。</li>
        <li>もしめくった写真が初めて出るものでなく、すでに誰かがあだ名をつけた写真だったら、そのあだ名を叫びます。</li>
        <li>一番早く正確にあだ名を言えた人が、勝ち！</li>
        <li>もし誰もあだ名を正確に思い出せない場合は、その写真にまた新しいあだ名をつけてゲームを続行しましょう。</li>
    </ol>
    <button
      onClick={() => setSceneController('Name')}
      className="p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg m-2"
    >
      新規ゲームスタート
    </button>
    </>
  )
}