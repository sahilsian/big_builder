import { Context } from "../../../../context/context_provider"
import { useContext, useEffect } from "react"
import { CiEdit } from "react-icons/ci"

const State = ({ node }) => {
    const {selectedNode, setSelectedNode} = useContext(Context);

    return (
        <div>
            <div className="">
                <CiEdit style={{color: selectedNode?.id === node.id ? "#eb7434" : "#3489eb"}}  onClick={()=> setSelectedNode(selectedNode?.id === node.id ? null : node)} className="  cursor-pointer transition-all" size={"22px"}></CiEdit>
            </div>
        </div>
    )
}

export default State