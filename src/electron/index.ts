type ElectronApi = {
    readTextFile: (path: string) => Promise<string | undefined>;
    writeTextFile: (path: string, content: string) => Promise<boolean>;
    showMessageBox: (
        message: string,
        mode?: "none" | "info" | "error" | "question" | "warning",
        title?: string,
    ) => Promise<void>;
};

const getElectronApi = (): ElectronApi => {
    return (window as any).electronAPI;
};

export { getElectronApi };
export type { ElectronApi };

