import { useEffect, useState } from "react";
import { CiSquareAlert } from "react-icons/ci";
import { MdDragIndicator } from "react-icons/md";

const DraggableItem = ({ item, press, setPress = () => { } }) => {

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePos({ x: event.clientX, y: event.clientY });
        }

        window.addEventListener("mousemove", handleMouseMove);

        return () => window.removeEventListener("mousemove", handleMouseMove);
    })

    useEffect(() => {
        const handleMouseUp = () => {
            setPress({id: item.id, isPressed: false});
            setMousePos({ x: 0, y: 0 })
        };

        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [setPress]);



    return (
        <div className="relative">
            {(press.isPressed && item.id == press.id) &&
                <div className="p-4 bg-[#efefef80] w-full rounded-2xl h-full flex justify-between items-center absolute">
                </div>
            }
            {(press.isPressed && item.id == press.id) &&
                <div className=" absolute p-4" style={{left: mousePos.x, top: mousePos.y -100}}>
                    {item.icon}
                </div>
            }
            

            <div
                className="p-4 select-none border-[1px] border-[#00000010] rounded-2xl flex justify-between items-center cursor-pointer"
                onMouseDown={() => setPress({id: item.id, isPressed: true})}
            >
                <div className="flex items-center justify-center gap-3">
                    {item.icon}
                    {item.title}
                </div>
                <div>
                    <MdDragIndicator size={"24px"} />
                </div>
            </div>
        </div>
    );
};

export default DraggableItem;
