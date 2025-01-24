

export default function Home({ setSceneController }: { setSceneController : React.Dispatch<React.SetStateAction<string>> }){

  return(
    <>
    <h2 className="text-2xl">は、<b>人間版なんじゃもんじゃ <br /> ゲームです。</b></h2><br />
    <p className="text-2xl">カードになるのはあなた自身!!</p><br />
    <p>※このアプリケーションでは <br /> カメラを使用します。</p>
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