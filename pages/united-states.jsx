import fs from "fs";
import path from "path";

export { UnitedStatesPage as default } from "../src/pages";

export async function getStaticProps() {
  const mapDataPath = path.join(process.cwd(), "data", "map-data-us.json");
  const mapData = JSON.parse(fs.readFileSync(mapDataPath, "utf8")).filter(
    (data) => data.id !== "DC"
  );

  return {
    props: {
      mapData,
    },
  };
}
