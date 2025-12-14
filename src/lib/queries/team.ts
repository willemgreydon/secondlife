import { groq } from "next-sanity";

export const teamListQuery = groq`
  *[_type == "teamMember" && !(_id in path("drafts.**"))]
  | order(order asc) {
    _id,
    name,
    role,
    linkedin,
    email,
    bio,
    "image": photo.asset->url
  }
`;
