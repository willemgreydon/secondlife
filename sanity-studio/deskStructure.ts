// sanity-studio/deskStructure.ts
import type { StructureResolver } from 'sanity/desk'
import { apiVersion } from './env'

const singletonPage = (S: any, title: string, id: string) =>
  S.listItem()
    .title(title)
    .child(S.document().title(title).schemaType('page').documentId(id))

const bySlugList = (S: any, title: string, slug: string) =>
  S.documentTypeList('page')
    .title(title)
    // @ts-ignore
    .apiVersion?.(apiVersion) ?? S.documentTypeList('page').title(title)
    .filter('_type == "page" && slug.current == $slug')
    .params({ slug })

const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      singletonPage(S, 'Home', 'home'),
      singletonPage(S, 'TIDE', 'tide'),
      singletonPage(S, 'Operations', 'operations'),
      singletonPage(S, 'Join Us', 'join-us'),
      singletonPage(S, 'Contact', 'contact'),

      S.listItem()
        .title('Missions')
        .child(
          S.list()
            .title('Missions')
            .items([
              singletonPage(S, 'Missions (Overview Page)', 'missions'),
              S.documentTypeListItem('mission').title('All Missions'),
              S.listItem()
                .title('Beach Clean-Ups')
                .child(
                  S.documentTypeList('mission')
                    .title('Beach Clean-Ups')
                    .filter(`
                      _type == "mission" &&
                      (
                        category == "beachCleanup" ||
                        "beach-cleanup" in tags[] ||
                        "beach-cleanups" in tags[] ||
                        slug.current match "beach-cleanups"
                      )
                    `)
                ),
              S.listItem()
                .title('Missions — With Metrics')
                .child(
                  S.documentTypeList('mission')
                    .title('Missions — With Metrics')
                    .filter('_type == "mission" && defined(metrics) && count(metrics) > 0')
                ),
              S.listItem()
                .title('Missions — Without Metrics')
                .child(
                  S.documentTypeList('mission')
                    .title('Missions — Without Metrics')
                    .filter('_type == "mission" && (!defined(metrics) || count(metrics) == 0)')
                ),
              singletonPage(S, 'DANA 24 VLC', 'dana-24-vlc'),
              singletonPage(S, 'Revolutionizing Beach Clean-Ups', 'revolutionizing-beach-clean-ups'),
            ])
        ),

      S.listItem().title('Our Team').child(S.documentTypeList('teamMember').title('Team Members')),

      S.divider(),

      S.documentTypeListItem('event').title('Events'),
      S.documentTypeListItem('campaign').title('Campaigns'),
      S.documentTypeListItem('blogPost').title('Blog Posts'),
      // S.documentTypeListItem('page').title('All Pages'),
    ])

export default deskStructure
