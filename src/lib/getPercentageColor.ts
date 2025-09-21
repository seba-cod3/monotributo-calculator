const marginColors = new Map<(value: number) => boolean, string>();
marginColors.set((x: number) => x < 0, "text-red-600");
marginColors.set((x: number) => x >= 0 && x < 5, "text-yellow-600");
marginColors.set((x: number) => x >= 5, "text-green-600");

export const getPercentageColor = (margin: number): string | undefined => {
  for (const [callback, color] of marginColors) {
    if (callback(margin)) return color;
  }
};
