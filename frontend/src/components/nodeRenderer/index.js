import { useContext } from "react"
import Heading from "../tree/heading"
import Paragraph from "../tree/paragraph"

const NodeRenderer = ({node}) => {
    switch(node.type) {
        case 0:
            return (
                <div></div>
            )
        case 1:
            return (
               <Heading node={node} ></Heading> 
            )
        case 2:
            return (
                <Paragraph node={node} ></Paragraph>
            )
        default:
            return (
                <div></div>
            )
    }
}

export default NodeRenderer