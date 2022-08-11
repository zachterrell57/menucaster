require("dotenv").config();

module.exports = {
  packagerConfig: {
    icon: "./assets/app-icon.icns",
    osxSign: {
      identity: "Developer ID Application: Zachary Terrell (25P22K2K3W)",
      "hardened-runtime": true,
      entitlements: "entitlements.plist",
      "entitlements-inherit": "entitlements.plist",
      "gatekeeper-assess": false,
    },
    osxNotarize: {
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APP_SPECIFIC_PASSWORD,
    },
  },
  makers: [
    {
      name: "@electron-forge/maker-dmg",
      config: {
        format: "ULFO",
      },
    },
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "menucaster",
      },
    },
    {
      name: "@electron-forge/maker-zip",
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
};
