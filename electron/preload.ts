import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    readTextFile: (path: string) => ipcRenderer.invoke("fs:readTextFile", path),
    writeTextFile: (path: string, content: string) =>
        ipcRenderer.invoke("fs:writeTextFile", path, content),
    showMessageBox: (
        message: string,
        type?: "none" | "info" | "error" | "question" | "warning",
        title?: string,
    ) => ipcRenderer.invoke("showMessageBox", message, type, title),
});
