const { app } = require("electron");
const { menubar } = require("menubar");
var path = require("path");

const iconPath = path.join(__dirname, "assets", "icon.png");

const mb = menubar({
  icon: iconPath,
  showDockIcon: false,
  browserWindow: {
    width: 500,
    height: 200,
    transparent: true,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  },
});

try {
  require("electron-reloader")(module);
} catch (_) {}

mb.on("ready", () => {
  console.log("Menubar app is ready.");
});

mb.on("will-resize", (e) => {
  e.preventDefault();
});

mb.on("after-create-window", () => {
  // app.dock.hide();
});
