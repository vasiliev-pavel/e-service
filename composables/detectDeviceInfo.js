export function detectDeviceInfo() {
  const ua = navigator.userAgent;
  const platform = navigator.platform;
  const browsers = {
    Firefox: ua.includes("Firefox"),
    SamsungInternet: ua.includes("SamsungBrowser"),
    Opera: ua.includes("Opera") || ua.includes("OPR"),
    InternetExplorer: ua.includes("Trident"),
    Edge: ua.includes("Edge"),
    Chrome: ua.includes("Chrome") && !ua.includes("Edge"),
    Safari: ua.includes("Safari") && !ua.includes("Chrome"),
  };
  const oses = {
    Windows: platform.includes("Win"),
    macOS: platform.includes("Mac"),
    Linux: platform.includes("Linux"),
    Android: /Android/.test(ua),
    iOS: /iPhone|iPad|iPod/.test(ua),
  };
  const browserName =
    Object.keys(browsers).find((key) => browsers[key]) || "Unknown";
  const os = Object.keys(oses).find((key) => oses[key]) || "Unknown";
  return { browser: browserName, os: os, userAgent: ua };
}
