import TextSuite from "../suites/textSuite"

const EditRenderer = ({selectedNode}) => {
    switch (selectedNode.type) {
        case 0:
            return (
                <div></div>
            )
        case 1:
            return (
                <div>
                    <TextSuite node={selectedNode}></TextSuite>
                </div>
            )
        default:
            return (
                <div></div>
            )
    }
}

export default EditRenderer