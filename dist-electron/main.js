import { app as o, BrowserWindow as e } from "electron";
o.whenReady().then(() => {
  new e().loadURL("http://localhost:3000");
});
