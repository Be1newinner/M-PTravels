export const DB_NAME = "mp-base";

export enum IMAGE_TYPES_ENUM {
  BUS_IMAGE = "BUS_IMAGE",
  PACKAGE_IMAGE = "PACKAGE_IMAGE",
}

export const IMAGE_SIZES: Record<
  IMAGE_TYPES_ENUM,
  { width: number; height: number }
> = {
  [IMAGE_TYPES_ENUM.BUS_IMAGE]: { width: 1024, height: 1024 },
  [IMAGE_TYPES_ENUM.PACKAGE_IMAGE]: { width: 1280, height: 960 },
};

export const IMAGE_TYPES: IMAGE_TYPES_ENUM[] = Object.keys(
  IMAGE_SIZES
) as IMAGE_TYPES_ENUM[];

export const TAX = 0.18;
