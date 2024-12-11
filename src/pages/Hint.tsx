import React, { useEffect, useRef } from "react";

export default function Hint({ isOpenHint, setIsOpenHint }: { isOpenHint: boolean, setIsOpenHint: React.Dispatch<React.SetStateAction<boolean>> }) {

    // ---------------------------------------------
    // モーダル外をクリックした時の処理
    // ---------------------------------------------
    const HintRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (HintRef.current && !(HintRef.current as HTMLElement).contains(event.target as Node)) {
                setIsOpenHint(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [HintRef, setIsOpenHint]);


    // ---------------------------------------------
    // モーダル表示中: 背面のスクロールを禁止
    // ---------------------------------------------
    useEffect(() => {
        if (isOpenHint) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpenHint]);

    return (
        <>
            {isOpenHint &&
                <div className="fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50">
                    <div className="relative z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[95vh] md:max-h-[90vh] w-[97vw] md:w-[80vw] p-4 md:p-10 md:pb-20 bg-slate-100 border-2 border-neutral-950 shadow-lg rounded-xl overflow-auto text-black " ref={HintRef}>

                        {/* ここにヒントの中身 */}
                        <ul>
                            <li>パロディ（例：小林製薬）</li>
                            <li>英語にしてみよう</li>
                            <li>繰り返してみよう</li>
                            <li>ポーズを参考にしてみよう</li>
                            <li>服装に注目してみよう</li>
                            <li>表情に注目してみよう</li>
                        </ul>

                    </div>
                </div>
            }
        </>

    );
}