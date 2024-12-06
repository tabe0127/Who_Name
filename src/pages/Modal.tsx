import React, { useEffect, useRef } from "react";

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
                        <h1 className="text-4xl">Who?Name!</h1><p>は、一人ずつ順番にNextボタンを押して写真を一枚めくるのを繰り返します。<br /><br /></p>
                        <p className="text-left">めくった写真が初めて出る写真なら、めくった人は写真に写っている人に<b>名前に関連するあだ名</b>をつけます。<br />
                        次の人も同じようにして写真をめくり、初めて出る写真であれば写っている人に<b>名前に関連するあだ名</b>つける、というのが基本的な流れです。<br />
                        もしめくった写真が初めて出るものでなく、すでに誰かがあだ名をつけた写真だったら、そのあだ名を叫びます。<br />
                        一番早く正確にあだ名を言えた人が、勝ち！<br />
                        もし誰もあだ名を正確に思い出せない場合は、その写真にまた新しいあだ名をつけてゲームを続行しましょう。</p>

                    </div>
                </div>
            }
        </>

    );
}