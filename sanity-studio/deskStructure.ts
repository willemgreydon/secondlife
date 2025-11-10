// sanity-studio/deskStructure.ts
import type { StructureResolver } from 'sanity/desk'
import { apiVersion } from './env'

// Fixed-id singleton helper (no initialValueTemplates here)
const singletonPage = (S: any, title: string, id: string) =>
  S.listItem()
    .title(title)
    .child(
      S.document()                 // <- use document() (stable in v3)
        .title(title)
        .schemaType('page')
        .documentId(id)            // fixed _id (e.g. "home")
    )

// Optional: a filtered list helper (when you want to browse by slug)
// Keep apiVersion to silence the warning.
const bySlugList = (S: any, title: string, slug: string) =>
  S.documentTypeList('page')
    .title(title)
    .apiVersion(apiVersion)
    .filter('_type == "page" && slug.current == $slug')
    .params({ slug })

const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // True singletons
      singletonPage(S, 'Home', 'home'),
      singletonPage(S, 'TIDE', 'tide'),
      singletonPage(S, 'Operations', 'operations'),
      singletonPage(S, 'Join Us', 'join-us'),
      singletonPage(S, 'Contact', 'contact'),

      // Missions group
      S.listItem()
        .title('Missions')
        .child(
          S.list()
            .title('Missions')
            .items([
              singletonPage(S, 'Missions (Overview Page)', 'missions'),
              S.documentTypeListItem('mission').title('All Missions'),
              S.documentTypeListItem('beachCleanup').title('Beach Clean-Ups'),
              singletonPage(S, 'DANA 24 VLC', 'dana-24-vlc'),
              singletonPage(
                S,
                'Revolutionizing Beach Clean-Ups',
                'revolutionizing-beach-clean-ups'
              ),
            ])
        ),

      // Team members collection
      S.listItem()
        .title('Our Team')
        .child(S.documentTypeList('teamMember').title('Team Members')),

      S.divider(),

      // Generic collections
      S.documentTypeListItem('event').title('Events'),
      S.documentTypeListItem('campaign').title('Campaigns'),
      S.documentTypeListItem('blogPost').title('Blog Posts'),

      // Debug all pages if needed:
      // S.documentTypeListItem('page').title('All Pages'),
    ])

export default deskStructure