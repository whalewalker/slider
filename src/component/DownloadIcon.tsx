import { LuDownload } from 'react-icons/lu';
import React from "react";

const DownloadIcon: React.FC<{ content: string; fileName: string, contentType: string }> = ({ content, contentType, fileName }) => {
    const handleDownload = () => {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return <LuDownload size="1.3rem" onClick={handleDownload} />;
};

export default DownloadIcon;
