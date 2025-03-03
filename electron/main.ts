import { app, BrowserWindow, ipcMain } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import * as path from "path";
import readTextFile from "./api/readTextFile";
import showMessageBox from "./api/showMessageBox";
import writeTextFile from "./api/writeTextFile";

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (app.isPackaged) {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL("http://localhost:3000/index.html");

    win.webContents.openDevTools();

    // Hot Reloading on 'node_modules/.bin/electronPath'
    require("electron-reload")(__dirname, {
      electron: path.join(
        __dirname,
        "..",
        "..",
        "node_modules",
        ".bin",
        "electron" + (process.platform === "win32" ? ".cmd" : ""),
      ),
      forceHardReset: true,
      hardResetMethod: "exit",
    });
  }
}

app.whenReady().then(() => {
  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));

  ipcMain.handle("fs:readTextFile", (_, path) => readTextFile(path));
  ipcMain.handle(
    "fs:writeTextFile",
    (_, path, content) => writeTextFile(path, content),
  );
  ipcMain.handle(
    "showMessageBox",
    (_, message, type, title) => showMessageBox(message, type, title),
  );

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});
