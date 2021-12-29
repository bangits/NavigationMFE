export const calculateWifiSpeed = (): 1 | 2 | 3 => {
  // @ts-expect-error Typescript NetworkInformation doesn't contain downlink
  const downloadMbPerSecond = (navigator?.connection as { downlink: number })?.downlink;

  if (!downloadMbPerSecond) return 3;

  if (downloadMbPerSecond >= 1) return 3;

  if (downloadMbPerSecond <= 0.4) return 1;

  if (downloadMbPerSecond < 1.4) return 2;
};
