// Minimaler Studio-Container (falls bereits vorhandene Datei – so lassen/ersetzen)
'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity-studio/sanity.config'
export default function StudioPage() {
  return <NextStudio config={config} />
}
