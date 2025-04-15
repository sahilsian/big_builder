import { CiEdit } from "react-icons/ci";
import { MdOutlineTextIncrease } from "react-icons/md";
import State from "../widgets/state";
import { useContext } from "react";
import { Context } from "@/context/context_provider";
import TextInput from "../widgets/textInput";

const Heading = ({ node }) => {
    const { selectedNode, setSelectedNode } = useContext(Context)
    return (
        <div style={{borderColor:  selectedNode?.id === node.id ? "#eb7434" : "#3489eb"}} className="border-2 transition-all  p-5 relative">
            <div>
                <div className="flex items-center gap-3">

                <div className=" text-[#00000050] tracking-wider font-bold text-sm">
                    HEADER
                </div>
                <State node={node}></State>
                </div>
                <div className="h-2"></div>
                <TextInput setSelectedNode={setSelectedNode} selectedNode={selectedNode} node={node}></TextInput>
            </div>
            
        </div>
    )
}

export default Heading