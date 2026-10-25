export interface EditItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  image: string;
  imageAlt: string;
  editorNote: string;
  provenance: string;
  stylingTip: string;
  materials: string;
  editorialRating: string;
}

export const THE_EDIT_ITEMS: EditItem[] = [
  {
    id: 'edit-1',
    name: 'The Double-Breasted Cashmere Overcoat',
    brand: 'Sartoria Bellini, Milan',
    category: 'Outerwear',
    price: '$3,850',
    image: '/images/edit_cashmere_overcoat_1792943598265.webp',
    imageAlt: 'Bespoke charcoal virgin cashmere double-breasted overcoat on tailoring mannequin in Milan sartoria',
    editorNote: 'Cut with subtle Milanese shoulder roping and 600g double-faced virgin wool, this overcoat delivers understated architectural authority without visual noise.',
    provenance: 'Cut and hand-finished by master tailors in Milan with natural horn buttons.',
    stylingTip: 'Drape unbuttoned over a fine-gauge charcoal turtleneck, fluid tailored wool trousers, and unlined loafers.',
    materials: '100% Loro Piana double-faced wool, cupro pocket linings, horn buttons',
    editorialRating: 'Editor’s Essential Investment',
  },
  {
    id: 'edit-2',
    name: 'The Box Calfskin Hand-Stitched Saddle Flap',
    brand: 'Atelier de Cuir, Paris',
    category: 'Handbags & Leather',
    price: '$2,950',
    image: '/images/edit_saddle_flap_bag_1792943598488.webp',
    imageAlt: 'Handcrafted caramel tan box calfskin leather saddle flap handbag with palladium hardware on travertine plinth',
    editorNote: 'Built with traditional saddle stitching using two hand needles and beeswax linen thread. This is not seasonal fast fashion, but an heirloom piece that acquires character over decades.',
    provenance: 'Handcrafted in the 3rd Arrondissement, Paris, using vegetable-tanned French hides.',
    stylingTip: 'Carry by the top handle for salon appointments or wear crossbody over an oversized trench for weekend museum visits.',
    materials: 'French box calf leather, beeswax linen thread, solid palladium hardware',
    editorialRating: 'Atelier Craftsmanship Icon',
  },
  {
    id: 'edit-3',
    name: 'The Skeletonized Tourbillon Timepiece',
    brand: 'Haute Horlogerie Genève',
    category: 'High Horology',
    price: '$22,500',
    image: '/images/edit_tourbillon_watch_1792943599010.webp',
    imageAlt: 'Haute horlogerie skeletonized titanium mechanical flying tourbillon watch on dark slate',
    editorNote: 'With hand-chamfered bridges, openworked titanium escapement, and an unhurried 21,600 vph balance wheel, this timepiece brings pure mechanical poetry to the wrist.',
    provenance: 'Assembled and regulated over 180 hours in the Vallée de Joux, Switzerland.',
    stylingTip: 'Let the 9mm ultra-thin case slip discreetly beneath French cuffs and tailored dinner jacket sleeves.',
    materials: 'Grade 5 Titanium, hand-beveled bridges, sapphire crystal front and caseback',
    editorialRating: 'Collector’s Piece',
  },
  {
    id: 'edit-4',
    name: 'The Liquid Obsidian Biomaterial Evening Cloak',
    brand: 'Atelier Biomateriaux, Lyon',
    category: 'Eveningwear',
    price: '$4,400',
    image: '/images/edit_biomaterial_cloak_1792943629754.webp',
    imageAlt: 'Obsidian black cultivated regenerative biomaterial silk evening cloak with sculptural drape',
    editorNote: 'Woven from laboratory-cultivated protein filaments with the liquid drape of heavy silk satin, completely carbon-negative and feather-light.',
    provenance: 'Bio-engineered in Lyon and draped by Paris couture ateliers.',
    stylingTip: 'Fasten with a sculptural brass or gold brooch over a monochrome floor-length column for gallery vernissages.',
    materials: 'Cultivated structural protein fiber, plant-based non-toxic natural black dye',
    editorialRating: 'Future of Couture',
  },
  {
    id: 'edit-5',
    name: 'The Bias-Cut Silk Velvet Red Carpet Column',
    brand: 'Maison Haute Couture, Paris',
    category: 'Haute Couture',
    price: '$6,200',
    image: '/images/edit_velvet_column_gown_1792943629394.webp',
    imageAlt: 'Ruby crimson bias-cut silk velvet evening column gown with sculpted bustier in Parisian salon',
    editorNote: 'Sculpted corsetry with bias-cut silk velvet that absorbs camera flashes with rich burgundy depth. A timeless masterwork that commands attention without gimmickry.',
    provenance: 'Hand-draped and corseted in Paris with over 120 atelier hours of hand-finishing.',
    stylingTip: 'Pair with minimal diamond architectural studs and sleek hair pulled back into a disciplined chignon.',
    materials: '100% Mulberry silk velvet, silk habotai inner lining, internal horsehair boning',
    editorialRating: 'Red Carpet Statement',
  },
  {
    id: 'edit-6',
    name: 'The Archival Houndstooth Wool Capelet',
    brand: 'French Heritage Archive',
    category: 'Vintage Archive',
    price: '$3,600',
    image: '/images/edit_houndstooth_capelet_1792943600169.webp',
    imageAlt: 'Archival vintage black and ivory houndstooth hand-loomed wool capelet with mother-of-pearl buttons',
    editorNote: 'Sourced from private European archives and restored with museum-grade textile conservation. Houndstooth weave with hand-bound buttonholes and mother-of-pearl buttons.',
    provenance: 'Preserved from a 1974 private Parisian couture commission.',
    stylingTip: 'Layer over a fine cashmere knit dress with knee-high equestrian leather boots.',
    materials: 'Hand-loomed Scottish wool, vintage silk twill lining, iridescent river shell buttons',
    editorialRating: 'Archival Provenance',
  },
];
