import React, { useEffect, useRef } from "react";
import Image from "next/image";
import soraki from '../assets/samples/IMG_8278.jpg'
import tabe from '../assets/samples/IMG_8279.jpg'
import ise from '../assets/samples/IMG_8281.jpg'

export default function Modal({ isOpenModal, setIsOpenModal }: { isOpenModal: boolean, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) {

    // ---------------------------------------------
    // モーダル外をクリックした時の処理
    // ---------------------------------------------
    const modalRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !(modalRef.current as HTMLElement).contains(event.target as Node)) {
                setIsOpenModal(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef, setIsOpenModal]);


    // ---------------------------------------------
    // モーダル表示中: 背面のスクロールを禁止
    // ---------------------------------------------
    useEffect(() => {
        if (isOpenModal) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpenModal]);

    return (
        <>
            {isOpenModal &&
                
                <div className="fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50">
                    <div className="relative z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[95vh] md:max-h-[90vh] w-[97vw] md:w-[80vw] p-4 md:p-10 md:pb-20 bg-slate-100 border-2 border-neutral-950 shadow-lg rounded-xl overflow-auto text-black " ref={modalRef}>

                        {/* ここにモーダルの中身 */}
                        <h1 className="text-4xl">Who?Name!</h1><h2 className="text-2xl">は、<b>人間版なんじゃもんじゃゲームです。</b></h2><br />
                        <h2 className="text-2xl">ゲーム前の準備</h2><br />
                        <ol style={{ listStyleType: "decimal" , textAlign: "left", marginLeft: "20px" }}>
                            <li>いろんなポーズで自分の写真と本名をアップロードします。</li>
                            <li>4人以下なら1人3枚、5人以上なら1人2枚推奨</li>
                            <li>全員分の写真とが集まったらゲームスタート！</li>
                            <div className="flex">
                              <Image src={soraki} alt={"soraki"} width={220} height={100} />
                              <Image src={tabe} alt={"tabe"} width={220} height={100} />
                              <Image src={ise} alt={"ise"} width={220} height={100} />
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
                        

                    </div>
                </div>
                
            }
        </>

    );
}