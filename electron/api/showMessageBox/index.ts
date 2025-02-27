import { BrowserWindow, dialog } from "electron";

const showMessageBox = async (
    message: string,
    type?: "none" | "info" | "error" | "question" | "warning",
    title?: string,
) => {
    return await dialog.showMessageBox(BrowserWindow.getAllWindows()[0], {
        message,
        type,
        title,
    });
};

export default showMessageBox;
