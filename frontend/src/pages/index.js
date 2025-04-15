import DraggableItem from "@/components/draggableItem";
import { useContext, useEffect, useState } from "react";
import TreeNode from "@/components/treeNode";
import { v4 as uuidv4 } from 'uuid';
import { Context } from "../context/context_provider";
import Build from "@/components/build";
import Edit from "@/components/edit";
import Templates from "@/components/templates";

export default function Home() {

  const { selectedNode } = useContext(Context);
  const [dragged, setDragged] = useState({ id: null, isPressed: false })
  const [nodes, setNodes] = useState([
  ])

  const addNode = () => {
    const id = uuidv4();
    setNodes([...nodes, { id: id, type: null }])
  }

  useEffect(() => {
    console.log(nodes)
  }, [nodes])

  return (
    <div className="flex w-full  relative">
      {/* editorial */}
      <div className="flex-1 h-full max-w-[350px]">
      </div>
      <div className="flex-1 h-full fixed left-0 p-4 flex w-[350px]">
        <div className="flex-1 w-full h-full ">
          <h1 className=" py-4 text-3xl w-full border-b-[1px] border-b-[#00000010]">BIG_BUILDER</h1>
          {selectedNode ?
            <div>
              <div className="h-4 "></div>
              <div className=" text-[#00000050] tracking-wider font-bold text-sm">
                EDIT
              </div>
              <div className="h-4 "></div>
              <Edit></Edit>
            </div>
            :
            <div>
              <div className="h-4 "></div>
              <div className=" text-[#00000050] tracking-wider font-bold text-sm">
                COMPONENTS
              </div>
              <div className="h-4 "></div>
              <div className="flex flex-col gap-4">
                <Build dragged={dragged} setDragged={setDragged}></Build>
              </div>
            </div>
          }



        </div>
      </div>
      {/* sandbox */}
      <div className="bg-[#cacaca] flex-3 h-full p-10">
        <div className="mb-3">
          <Templates nodes={nodes} setNodes={setNodes}></Templates>
        </div>
        <div className="w-full min-h-screen flex flex-col  bg-white">
          {nodes.map((node) => {
            return (
              <TreeNode key={node.id} setNodes={setNodes} tree_node={node} setIncommingNode={setDragged} incomingNode={dragged}></TreeNode>
            )
          })}
          <div className="p-4">
            <div onClick={addNode} className="p-4 cursor-pointer hover:opacity-85 transition-all text-white font-medium text-center bg-blue-500">Add a Component
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
