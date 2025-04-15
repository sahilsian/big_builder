import { Context } from "@/context/context_provider";
import { useContext, useEffect, useState, useTransition } from "react"

const TextSuite = ({ node }) => {
    const {setBounce} = useContext(Context)
    const [fontSize, setFontSize] = useState(
        node.metadata?.text?.fontSize
    );

    const handleFontSizeChange = (e) => {
        setBounce(true)
        setFontSize(parseInt(e.target.value))
        node.metadata.text.fontSize = parseInt(e.target.value); 
    }


    return (
        <div>
            <span className="text-[#00000077] tracking-wider font-light text-sm">Font Size</span>
            <div className="h-[10px]"></div>
            <div>
                <input onChange={handleFontSizeChange} value={fontSize} inputMode="numeric" type="number" className="border-2 px-2 border-[#00000020] w-full"></input>
            </div>
        </div>
    )
}

export default TextSuite