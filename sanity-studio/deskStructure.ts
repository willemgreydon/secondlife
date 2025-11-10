// sanity-studio/deskStructure.ts
import type { StructureResolver } from 'sanity/desk'
import { apiVersion } from './env'

// Helper: singleton "page" with fixed _id (e.g. "home")
const singletonPage = (S: any, title: string, id: string) =>
  S.listItem()
    .title(title)
    .child(
      S.document()
        .title(title)
        .schemaType('page')
        .documentId(id)
    )

// Optional helper: list pages by slug (kept to quiet apiVersion warnings)
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
      // -----------------------------
      // Singletons (fixed-ID pages)
      // -----------------------------
      singletonPage(S, 'Home', 'home'),
      singletonPage(S, 'TIDE', 'tide'),
      singletonPage(S, 'Operations', 'operations'),
      singletonPage(S, 'Join Us', 'join-us'),
      singletonPage(S, 'Contact', 'contact'),

      // NEW: Our Team page (where you add the Team section)
      singletonPage(S, 'Our Team (Page)', 'our-team'),

      // -----------------------------
      // Missions group
      // -----------------------------
      S.listItem()
        .title('Missions')
        .child(
          S.list()
            .title('Missions')
            .items([
              // Overview page (singleton page with _id "missions")
              singletonPage(S, 'Missions (Overview Page)', 'missions'),

              // Full list
              S.documentTypeListItem('mission').title('All Missions'),

              // Smart lists for metrics hygiene
              S.listItem()
                .title('Missions — With Metrics')
                .child(
                  S.documentTypeList('mission')
                    .title('Missions — With Metrics')
                    .filter(
                      // at least one metric
                      '_type == "mission" && defined(metrics) && count(metrics) > 0'
                    )
                ),

              S.listItem()
                .title('Missions — Without Metrics')
                .child(
                  S.documentTypeList('mission')
                    .title('Missions — Without Metrics')
                    .filter(
                      // no metrics array or empty
                      '_type == "mission" && (!defined(metrics) || count(metrics) == 0)'
                    )
                ),

              // Beach cleanups collection
              S.documentTypeListItem('beachCleanup').title('Beach Clean-Ups'),

              // Other fixed pages under Missions
              singletonPage(S, 'DANA 24 VLC', 'dana-24-vlc'),
              singletonPage(
                S,
                'Revolutionizing Beach Clean-Ups',
                'revolutionizing-beach-clean-ups'
              ),
            ])
        ),

      // -----------------------------
      // Team members collection
      // -----------------------------
      S.listItem()
        .title('Our Team (Members)')
        .child(S.documentTypeList('teamMember').title('Team Members')),

      S.divider(),

      // -----------------------------
      // Generic collections
      // -----------------------------
      S.documentTypeListItem('event').title('Events'),
      S.documentTypeListItem('campaign').title('Campaigns'),
      S.documentTypeListItem('blogPost').title('Blog Posts'),

      // Uncomment if you ever want to browse all pages
      // S.documentTypeListItem('page').title('All Pages'),

      // Example of using bySlugList helper if needed:
      // bySlugList(S, 'Our Team (by slug)', 'our-team'),
    ])

export default deskStructure
