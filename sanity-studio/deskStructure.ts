import type { StructureBuilder } from 'sanity/desk'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home')
        .id('homePage')
        .child(S.editor().id('homePage').schemaType('homePage').documentId('home')),

      S.listItem()
        .title('TIDE')
        .id('tidePage')
        .child(S.editor().id('tidePage').schemaType('tidePage').documentId('tide')),

      S.listItem()
        .title('Operations')
        .id('operationsPage')
        .child(S.editor().id('operationsPage').schemaType('operationsPage').documentId('operations')),

      S.listItem()
        .title('Join Us')
        .id('joinUsPage')
        .child(S.editor().id('joinUsPage').schemaType('joinUsPage').documentId('join-us')),

      S.listItem()
        .title('Contact')
        .id('contactPage')
        .child(S.editor().id('contactPage').schemaType('contactPage').documentId('contact')),

      S.listItem()
        .title('Organisation')
        .id('organisationPage')
        .child(S.editor().id('organisationPage').schemaType('organisationPage').documentId('organisation')),

      S.divider(),

      S.listItem().title('Missions').schemaType('mission').child(S.documentTypeList('mission').title('Missions')),
      S.listItem().title('Events').schemaType('event').child(S.documentTypeList('event').title('Events')),
      S.listItem().title('Campaigns').schemaType('campaign').child(S.documentTypeList('campaign').title('Campaigns')),
      S.listItem().title('Partners').schemaType('partner').child(S.documentTypeList('partner').title('Partners')),
      S.listItem().title('Team').schemaType('teamMember').child(S.documentTypeList('teamMember').title('Team')),
      S.listItem().title('Blog Posts').schemaType('post').child(S.documentTypeList('post').title('Blog Posts')),
    ])

export default deskStructure
