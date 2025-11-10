import { type SchemaTypeDefinition } from "sanity";

import home from "./schemas/home";
import initiative from "./schemas/initiative";
import partner from "./schemas/partner";
import page from "./schemas/page";
import teamMember from "./schemas/teamMember";
import mission from "./schemas/mission";
import campaign from "./schemas/campaign";
import event from "./schemas/event";
import blogPost from "./schemas/blogPost";
import post from './schemas/post'; //

// object sections (WICHTIG: alle importieren UND registrieren)
import heroSection from './schemas/sections/heroSection';
import splitSection from './schemas/sections/splitSection';
import richTextSection from './schemas/sections/richTextSection';
import gallerySection from './schemas/sections/gallerySection';
import videoSection from './schemas/sections/videoSection';
import quoteSection from './schemas/sections/quoteSection';
import statsSection from './schemas/sections/statsSection';
import accordionSection from './schemas/sections/accordionSection';
import contactSection from './schemas/sections/contactSection';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // documents
    home,
    initiative,
    partner,
    page,
    teamMember,
    mission,
    campaign,
    event,
    blogPost,
    post,

    // objects
    heroSection,
    splitSection,
    richTextSection,
    gallerySection,
    videoSection,
    quoteSection,
    statsSection,
    accordionSection,
    contactSection,
  ],
};