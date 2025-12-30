// sanity-studio/deskStructure.ts
import type { StructureBuilder } from "sanity/desk";

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
        .title("Initiatives")
        .schemaType("initiative")
        .child(S.documentTypeList("initiative").title("Initiatives")),

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

      S.divider(),

      // Knowledge
      S.listItem()
        .title("Knowledge")
        .child(
          S.list()
            .title("Knowledge")
            .items([
              S.listItem()
                .title("Policy Briefs")
                .schemaType("policyBrief")
                .child(
                  S.documentTypeList("policyBrief")
                    .title("Policy Briefs")
                ),

              S.listItem()
                .title("Publications")
                .schemaType("publication")
                .child(
                  S.documentTypeList("publication")
                    .title("Publications")
                ),
            ])
        ),
    ]);
}
