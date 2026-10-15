import json

seo_data = {
  '01': {
    'tags': ['quiet luxury', 'couture', 'craftsmanship', 'paris atelier', 'minimalism', 'biella cashmere', 'vicuna wool', 'understated luxury'],
    'seoTitle': 'The New Guard of Quiet Luxury | Minimalist Fashion & Artisan Tailoring',
    'seoDescription': 'Investigating the quiet luxury movement, where European tailoring, Biella cashmere, and unbranded mastery replace logos and ephemeral hype.',
    'seoKeywords': ['quiet luxury', 'understated luxury fashion', 'Biella cashmere', 'vicuna wool', 'minimalist luxury wardrobe', 'unbranded luxury', 'artisan tailoring', 'haute couture craftsmanship', 'Paris atelier'],
    'datePublished': '2026-10-12T08:00:00Z',
    'dateModified': '2026-10-14T19:45:00Z',
    'wordCount': 1420,
    'relatedSlugs': ['italian-tailoring-modern-power', 'heritage-fashion-houses-reinvention', 'sustainable-luxury-fashion-materials']
  },
  '02': {
    'tags': ['tailoring', 'milan', 'power dressing', 'wool crepe', 'italian style', 'spalla camicia', 'bespoke suiting', 'sartoria'],
    'seoTitle': 'Italian Tailoring and Modern Power | Milanese Sartoria & Spalla Camicia',
    'seoDescription': "Milan's sharpest tailoring houses redraw the suit with relaxed authority, anatomical spalla camicia shoulders, and lightweight wool crepe.",
    'seoKeywords': ['Italian tailoring', 'Milan sartoria', 'spalla camicia', 'power dressing', 'bespoke suit', 'full canvas tailoring', 'Neapolitan shoulder', 'women tailoring', 'wool crepe'],
    'datePublished': '2026-10-12T08:30:00Z',
    'dateModified': '2026-10-14T19:45:00Z',
    'wordCount': 1280,
    'relatedSlugs': ['quiet-luxury-new-guard', 'luxury-handbag-craftsmanship', 'fashion-runway-shows-matter']
  },
  '03': {
    'tags': ['leathercraft', 'handbag', 'saddle stitch', 'atelier', 'heritage', 'vegetable tanned', 'box calf', 'parisian artisans'],
    'seoTitle': 'Inside the Handbag Atelier | Traditional Saddle Stitch & Leather Craftsmanship',
    'seoDescription': 'Inside the heritage leather atelier: tracing double-needle saddle stitching, vegetable-tanned box calf, and seven-layer hot edge finishing.',
    'seoKeywords': ['luxury handbag craftsmanship', 'saddle stitch leather', 'box calf leather', 'vegetable tanned leather', 'hot edge finishing', 'leathercraft atelier', 'handcrafted leather bag', 'bespoke saddlery', 'Parisian leather artisans'],
    'datePublished': '2026-10-12T09:00:00Z',
    'dateModified': '2026-10-14T19:45:00Z',
    'wordCount': 1350,
    'relatedSlugs': ['sustainable-luxury-fashion-materials', 'collecting-vintage-couture', 'luxury-watches-and-jewelry']
  },
  '04': {
    'tags': ['runway', 'paris fashion week', 'architecture', 'haute couture', 'catwalk critique', 'palais de tokyo', 'fashion choreography'],
    'seoTitle': 'Why the Runway Still Matters | Paris Fashion Week & Haute Couture Live',
    'seoDescription': 'Why live fashion runway presentations remain irreplaceable: acoustic architecture, kinetic motion, and the collective salon trance in Paris.',
    'seoKeywords': ['fashion runway shows', 'Paris fashion week', 'haute couture catwalk', 'live runway presentation', 'Palais de Tokyo fashion', 'catwalk choreography', 'runway trend analysis', 'fashion salon', 'kinetic fashion sculpture'],
    'datePublished': '2026-10-12T09:30:00Z',
    'dateModified': '2026-10-14T19:45:00Z',
    'wordCount': 1190,
    'relatedSlugs': ['red-carpet-fashion-dressing', 'heritage-fashion-houses-reinvention', 'italian-tailoring-modern-power']
  },
  '05': {
    'tags': ['heritage houses', 'archives', 'fashion direction', 'house codes', 'balenciaga dior', 'creative director', 'couture history'],
    'seoTitle': 'How Heritage Houses Reinvent Themselves | Archival Codes & Creative Direction',
    'seoDescription': 'How historic Parisian and Milanese fashion maisons decode archival blueprints and founder grammar to navigate modern culture without dilution.',
    'seoKeywords': ['heritage fashion houses', 'archival fashion codes', 'creative director reinvention', 'Parisian couture archives', 'fashion house grammar', 'Balenciaga Dior heritage', 'luxury brand lineage', 'haute couture curation'],
    'datePublished': '2026-10-12T10:00:00Z',
    'dateModified': '2026-10-14T19:45:00Z',
    'wordCount': 1240,
    'relatedSlugs': ['quiet-luxury-new-guard', 'collecting-vintage-couture', 'fashion-runway-shows-matter']
  },
  '06': {
    'tags': ['red carpet', 'couture diplomacy', 'celebrity style', 'hollywood', 'cannes', 'met gala', 'fashion semiotics', 'bespoke gowns'],
    'seoTitle': 'The Art of Red-Carpet Dressing | Couture Diplomacy & Cultural Semiotics',
    'seoDescription': 'The strategic architecture of red-carpet dressing: couture diplomacy, archival loans, internal bustier engineering, and global cultural impact.',
    'seoKeywords': ['red carpet couture dressing', 'celebrity fashion diplomacy', 'Cannes film festival fashion', 'custom couture gowns', 'haute couture red carpet', 'fashion stylist curation', 'cultural semiotics fashion', 'internal bustier engineering'],
    'datePublished': '2026-10-12T10:30:00Z',
    'dateModified': '2026-10-14T19:45:00Z',
    'wordCount': 1160,
    'relatedSlugs': ['fashion-runway-shows-matter', 'luxury-boutique-future', 'heritage-fashion-houses-reinvention']
  },
  '07': {
    'tags': ['retail architecture', 'boutique', 'hospitality', 'spatial design', 'avenue montaigne', 'sensory retail', 'travertine'],
    'seoTitle': 'The Future of the Luxury Boutique | Sensory Retail Architecture & Flagship Design',
    'seoDescription': 'Reimagining the luxury flagship as an architectural sanctuary of travertine, acoustic calm, and bespoke hospitality on Avenue Montaigne.',
    'seoKeywords': ['luxury boutique architecture', 'sensory retail design', 'flagship boutique interior', 'Avenue Montaigne retail', 'experiential luxury', 'travertine retail plinth', 'hospitality in luxury', 'spatial brand philosophy'],
    'datePublished': '2026-10-12T11:00:00Z',
    'dateModified': '2026-10-14T19:45:00Z',
    'wordCount': 1120,
    'relatedSlugs': ['red-carpet-fashion-dressing', 'quiet-luxury-new-guard', 'luxury-watches-and-jewelry']
  },
  '08': {
    'tags': ['vintage couture', 'collecting', 'textile conservation', 'haute couture', 'provenance', 'accession numbers', 'balenciaga 1950s'],
    'seoTitle': 'Collecting Vintage Couture Guide | Authentication & Textile Conservation',
    'seoDescription': 'A curator guide to collecting historical vintage couture: decoding atelier accession numbers, verifying hand-rolled seams, and archival textile conservation.',
    'seoKeywords': ['collecting vintage couture', 'vintage haute couture authentication', 'client order accession numbers', 'textile conservation museum', 'Balenciaga vintage couture', 'Dior bar jacket vintage', 'archival fashion collector', 'hand rolled silk seams'],
    'datePublished': '2026-10-12T11:30:00Z',
    'dateModified': '2026-10-14T19:45:00Z',
    'wordCount': 1480,
    'relatedSlugs': ['heritage-fashion-houses-reinvention', 'luxury-watches-and-jewelry', 'luxury-handbag-craftsmanship']
  },
  '09': {
    'tags': ['sustainability', 'materials', 'mycelium', 'regenerative fashion', 'closed loop wool', 'biomaterials', 'botanical dyes'],
    'seoTitle': 'Sustainable Luxury Materials | Mushroom Mycelium & Regenerative Textiles',
    'seoDescription': 'Where high ecology meets haute couture: pure mycelium cellular leather, regenerative grassland merino wool, and closed-loop bio-textiles.',
    'seoKeywords': ['sustainable luxury fashion materials', 'mushroom mycelium leather', 'regenerative merino wool', 'biodegradable luxury textiles', 'cellular agriculture fashion', 'closed-loop silk', 'eco-friendly haute couture', 'botanical bark tanning'],
    'datePublished': '2026-10-12T12:00:00Z',
    'dateModified': '2026-10-14T19:45:00Z',
    'wordCount': 1310,
    'relatedSlugs': ['luxury-handbag-craftsmanship', 'quiet-luxury-new-guard', 'collecting-vintage-couture']
  },
  '10': {
    'tags': ['horology', 'high jewelry', 'timepieces', 'craftsmanship', 'geneva', 'place vendome', 'flying tourbillon', 'anglage'],
    'seoTitle': 'Fashion Houses in High Horology & High Jewelry | In-House Calibers & Place Vendome',
    'seoDescription': 'How fashion houses conquered haute horlogerie and haute joaillerie: in-house tourbillon calibers, gentian-wood anglage, and Place Vendôme gem setting.',
    'seoKeywords': ['luxury watches and jewelry', 'high horology fashion houses', 'haute joaillerie Place Vendôme', 'in house watch caliber', 'flying tourbillon minute repeater', 'anglage hand finishing', 'gem setting platinum jewelry', 'Geneva watchmakers'],
    'datePublished': '2026-10-12T12:30:00Z',
    'dateModified': '2026-10-14T19:45:00Z',
    'wordCount': 1390,
    'relatedSlugs': ['collecting-vintage-couture', 'luxury-handbag-craftsmanship', 'luxury-boutique-future']
  }
}

with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
current_id = None

for line in lines:
    import re
    id_match = re.search(r"id:\s*'(\d+)'", line)
    if id_match:
        current_id = id_match.group(1)
    
    if current_id and "tags:" in line and current_id in seo_data:
        d = seo_data[current_id]
        indent = "    "
        new_lines.append(f"{indent}tags: {json.dumps(d['tags'])},\n")
        new_lines.append(f"{indent}seoTitle: {json.dumps(d['seoTitle'])},\n")
        new_lines.append(f"{indent}seoDescription: {json.dumps(d['seoDescription'])},\n")
        new_lines.append(f"{indent}seoKeywords: {json.dumps(d['seoKeywords'])},\n")
        new_lines.append(f"{indent}datePublished: {json.dumps(d['datePublished'])},\n")
        new_lines.append(f"{indent}dateModified: {json.dumps(d['dateModified'])},\n")
        new_lines.append(f"{indent}wordCount: {d['wordCount']},\n")
        new_lines.append(f"{indent}relatedSlugs: {json.dumps(d['relatedSlugs'])},\n")
        current_id = None # consumed
    else:
        new_lines.append(line)

with open('src/data/articles.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Successfully enriched articles with SEO data!")
