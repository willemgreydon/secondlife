// sanity-studio/deskStructure.ts
import type { StructureBuilder, DeskToolContextValue } from "sanity/desk";

// Mini-Helfer: Singleton-Editor
const singleton = (S: StructureBuilder, title: string, id: string) =>
  S.listItem()
    .title(title)
    .id(id)
    .child(
      S.editor()
        .id(`editor-${id}`)
        .schemaType("page")
        .documentId(id)
    );

// EINZIGER (!) deskStructure Export
export default function deskStructure(
  S: StructureBuilder
) {
  return S.list()
    .title("Content")
    .items([
      singleton(S, "Home", "home"),
      singleton(S, "TIDE", "tide"),
      singleton(S, "Operations", "operations"),
      singleton(S, "Join Us", "join-us"),
      singleton(S, "Contact", "contact"),
      singleton(S, "Organisation", "organisation"),

      S.divider(),

      // Page Overview
      S.listItem()
        .title("Pages (all)")
        .schemaType("page")
        .child(S.documentTypeList("page").title("Pages (all)")),

      // Collections
      S.listItem()
        .title("Missions")
        .schemaType("mission")
        .child(S.documentTypeList("mission").title("Missions")),

      S.listItem()
        .title("Events")
        .schemaType("event")
        .child(S.documentTypeList("event").title("Events")),

      S.listItem()
        .title("Campaigns")
        .schemaType("campaign")
        .child(S.documentTypeList("campaign").title("Campaigns")),

      S.listItem()
        .title("Partners")
        .schemaType("partner")
        .child(S.documentTypeList("partner").title("Partners")),

      S.listItem()
        .title("Team")
        .schemaType("teamMember")
        .child(S.documentTypeList("teamMember").title("Team")),

      S.listItem()
        .title("Blog Posts")
        .schemaType("post")
        .child(S.documentTypeList("post").title("Blog Posts")),
    ]);
}
