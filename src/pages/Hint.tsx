import React, { useEffect, useRef } from "react";

export default function Hint({ isOpenHint, setIsOpenHint }: { isOpenHint: boolean, setIsOpenHint: React.Dispatch<React.SetStateAction<boolean>> }) {

    const HintRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (HintRef.current && !HintRef.current.contains(event.target as Node)) {
                setIsOpenHint(false);
            }
        }
        if (isOpenHint) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpenHint, setIsOpenHint]);

    useEffect(() => {
        if (isOpenHint) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpenHint]);

    return (
        <>
            {isOpenHint && (
                <div className="fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        ref={HintRef}
                        className="relative z-20 max-h-[95vh] md:max-h-[90vh] w-[97vw] md:w-[80vw] p-4 md:p-10 md:pb-20 bg-slate-100 border-2 border-neutral-950 shadow-lg rounded-xl overflow-auto text-black"
                    >
                        <button
                            onClick={() => setIsOpenHint(false)}
                            className="absolute top-2 right-2 text-black font-bold bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            ✕
                        </button>
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
            )}
        </>
    );
}
