import { Context } from "@/context/context_provider";
import { useCallback, useContext, useEffect, useState } from "react";

const TextInput = ({ selectedNode, setSelectedNode, node }) => {
    const {bounce} = useContext(Context)
    const [text, setText] = useState(
        node.metadata?.text?.content === "Sample Text" ? "" : node.metadata.text?.content
    );

    const [fontSize, setFontSize] = useState(
        node.metadata?.text?.fontSize
    )


    const handleChange = (e) => {
        setText(e.target.value);
        node.metadata.text.content = e.target.value;
    };

    const handleSaveShortcut = useCallback((e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
            e.preventDefault();
            setSelectedNode(null);
            console.log("Saving...", text);
        }
    }, [text, setSelectedNode]);

    useEffect(()=> {
        console.log("BOUNCE: ", bounce)
    }, [bounce])

    useEffect(()=> {
        setFontSize(node.metadata?.text?.fontSize);

    }, [node.metadata?.text?.fontSize, fontSize])

    useEffect(() => {
        window.addEventListener("keydown", handleSaveShortcut);
        return () => {
            window.removeEventListener("keydown", handleSaveShortcut);
        };
    }, [handleSaveShortcut]);


    return (
        <div>
            {(!bounce && selectedNode?.id === node.id) ? (
                <div>
                    <input
                        autoFocus
                        style={{fontSize: fontSize}}
                        className="p-4 border-2 border-[#00000020] w-full"
                        value={text}
                        onChange={handleChange}
                        placeholder={
                            node.metadata?.text?.content === "Sample Text"
                                ? "Sample Text"
                                : ""
                        }
                    />
                </div>
            )
        
            :
            (
                <div onClick={()=> {setSelectedNode(node)}}>
                    <h2  style={{fontSize: fontSize}} className="">{node.metadata?.text?.content}</h2>
                </div>
            )
            }
        </div>
    );
};

export default TextInput;
