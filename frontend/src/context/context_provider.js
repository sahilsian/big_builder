import React, { useEffect } from 'react'
import { useState } from "react";

export const Context = React.createContext({
    editState: false,
    setEditState: () => {},
    selectedNode: null,
    setSelectedNode: () => {},
    bounce: false,
    setBounce: () => {}
});

const ContextProvider = ({ children }) => {
    const [editState, setEditState] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [bounce, setBounce] = useState(false)
    return (
        <Context.Provider value={{
            editState,
            setEditState,
            selectedNode,
            setSelectedNode,
            bounce,
            setBounce
        }}>
            {children}

        </Context.Provider>
    );
}

export default ContextProvider;