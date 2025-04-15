import { useEffect, useState } from "react";

const Templates = ({ nodes, setNodes }) => {
    const [templates_list, setTemplates_list] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await fetch('/api/templates');
                const data = await response.json();
                if (response.ok) {
                    setTemplates_list(data);
                }
            } catch (error) {
                console.error("Error fetching templates:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    const handleSave = async () => {
        try {
            const response = await fetch('/api/templates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ components: nodes }),
            });

            const data = await response.json();

            if (response.ok) {
                setTemplates_list([...templates_list, data]);
                setNodes([]);
            }
        } catch (error) {
            console.error("Error saving template:", error);
        }
    };

    const handleLoadTemplate = (node) => {
        setNodes(node);
    };

    if (loading) {
        return <div>Loading templates...</div>;
    }

    return (
        <div className="flex">
            <div className="w-full max-w-full flex gap-2 flex-wrap">
                {templates_list.map((node, index) => {
                    return (
                        <div
                            onClick={() => handleLoadTemplate(node)}
                            key={index}
                            className="bg-white p-4 cursor-pointer hover:opacity-85 transition-all inline-block min-w-[200px]"
                        >
                            Template {index + 1}
                        </div>
                    );
                })}
            </div>
            <div>
                <div
                    onClick={handleSave}
                    className="p-4 cursor-pointer hover:opacity-85 transition-all text-white font-medium text-center bg-blue-500"
                >
                    Save
                </div>
            </div>
        </div>
    );
};

export default Templates;
