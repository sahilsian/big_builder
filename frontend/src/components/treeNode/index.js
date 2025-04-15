import { useContext, useEffect, useRef, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import NodeRenderer from "../nodeRenderer";
import { Context } from "@/context/context_provider";

const TreeNode = ({
    setNodes,
    tree_node,
    incomingNode = { id: null, isPressed: null },
    setIncommingNode,
}) => {
    const { setSelectedNode } = useContext(Context)
    const [isMouseOver, setIsMouseOver] = useState(false);
    const isMouseOverRef = useRef(isMouseOver);
    const incomingNodeRef = useRef(incomingNode);
    const treeNodeIdRef = useRef(tree_node.id);

    useEffect(() => {
        isMouseOverRef.current = isMouseOver;
    }, [isMouseOver]);

    useEffect(() => {
        incomingNodeRef.current = incomingNode;
    }, [incomingNode]);

    useEffect(() => {
        treeNodeIdRef.current = tree_node.id;
    }, [tree_node.id]);

    useEffect(() => {
        const handleMouseUp = () => {
            const node = incomingNodeRef.current;
            const hovering = isMouseOverRef.current;
            const currentTreeNodeId = treeNodeIdRef.current;

            if (node.isPressed && hovering) {
                console.log("UPDATING ID:", currentTreeNodeId);
                //setSelectedNode(currentTreeNodeId);
                setNodes((prev) =>
                    prev.map((n) =>
                        n.id === currentTreeNodeId ? {
                            ...n, type: node.id, metadata: {
                                text: {
                                    content: "Sample Text",
                                    fontSize: 24
                                }
                            }
                        } : n,
                    )
                );

                setIncommingNode({ id: null, isPressed: false });
                setIsMouseOver(false);
            }
        };

        document.addEventListener("mouseup", handleMouseUp);
        return () => document.removeEventListener("mouseup", handleMouseUp);
    }, [setNodes, setIncommingNode]);

    return (
        <div className="p-2">
            {!tree_node.type && (
                <div
                    onMouseEnter={() => setIsMouseOver(true)}
                    onMouseLeave={() => setIsMouseOver(false)}
                    style={{
                        backgroundColor:
                            incomingNode.isPressed && isMouseOver ? "#ebf4fc" : "transparent",
                    }}
                    className="p-4 border-dashed border-[3px] border-[#d7d7d7] justify-center items-center transition-colors duration-200"
                >
                    <div className="flex flex-col justify-center items-center">
                        <div className="font-medium text-[#848484] text-center">
                            Drag an Item Here
                        </div>
                        <div>
                            <CiSquarePlus size={"24px"} />
                        </div>
                    </div>
                </div>
            )}
            {tree_node.type && (
                <div>
                    <NodeRenderer node={tree_node}></NodeRenderer>
                </div>
            )}
        </div>
    );
};

export default TreeNode;
