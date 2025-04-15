
import { MdOutlineTextFields } from "react-icons/md";
import { CiTextAlignLeft } from "react-icons/ci";
import DraggableItem from "../draggableItem";

const Build = ({dragged, setDragged}) => {

    const TypeDef_Components = [
        { id: 1, icon: <MdOutlineTextFields></MdOutlineTextFields>, title: "Header" },
        { id: 2, icon: <CiTextAlignLeft></CiTextAlignLeft>, title: "Paragraph" }
    ]

    return (
        <div className="flex-col flex gap-4">
            {TypeDef_Components.map((item) => {
                return (
                    <DraggableItem item={item} press={dragged} setPress={setDragged}></DraggableItem>
                )
            })}
        </div>
    )
}

export default Build