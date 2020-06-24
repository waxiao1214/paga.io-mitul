import Dexie from "dexie";

export const illusioDB = new Dexie("IllusioDB");
illusioDB.version(1).stores({
  profiles: "++id",
});
