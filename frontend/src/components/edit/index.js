import { useContext } from "react"
import EditRenderer from "./editRenderer.js"
import { Context } from "@/context/context_provider.js"

const Edit = () => {
    const {selectedNode} = useContext(Context)

    return (
        <div>
            <div>
                <EditRenderer selectedNode={selectedNode}></EditRenderer>                
            </div>
        </div>
    )
}

export default Edit