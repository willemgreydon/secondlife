import { defineType } from "sanity";

export default defineType({
  name: "missionsPage",
  title: "Missions Page",
  type: "document",
  fields: [
    {
      name: "content",
      type: "array",
      of: [{ type: "block" }, { type: "image" }, { type: "accordionSection" }]
    }
  ]
});