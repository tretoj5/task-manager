# Todoist — folded paper optimism

## Overview

A warm, practical software style that makes busy systems feel manageable rather than technical. Creamy white space, charcoal geometric grotesk headings and readable sans-serif copy are punctuated by tomato-red actions, pale peach, butter yellow and mint. Folded-paper illustrations, softly staged interfaces and human portrait collages add playfulness without making the page dense. It suits approachable productivity tools and services that sell relief, confidence and everyday usefulness.

### Essentials

- Promises feel conversational but sturdy: Graphik headlines use 55px/1.15, weight 600 and -0.01em tracking; capability headings use 38px/1.28 with -0.005em tracking rather than oversized billboard type.
- The opening gives the promise its own breathing room: center an 802px headline block above a 650px support line, one 64px-tall red action and a 1088×612px product stage whose top enters the first screen.
- The main action feels like a small pressed object: 15px corners, white 18.5px semibold text, a salmon-colored base exposed by 6px and translucent diagonal highlights; compact navigation actions instead use 8px corners and 39px height.
- Color behaves like tinted paper, not a saturated theme: keep the main canvas #fefdfc and most text #25221e; reserve #e34432 for small actions and use #fff6f0, #fff9eb and pale mint around demonstrations, proof and the closing band.
- Demonstrations sit inside friendly scenery: pale folded ribbons behind crisp white interface panels, 13–15px outer corners and faint 1px ink outlines; pair them with 15px-corner feature selectors with 8px gaps and a softly colored selected state.
- Human touches interrupt the system: include folded-paper metaphor art and a handwritten annotation in Shantell Sans at 19px/1.6; a small SVG collage of folded geometric objects and a curved arrow is the minimum equivalent when custom art is unavailable.
- The ending carries the warmth all the way through: a centered 44px/1.15 invitation dissolves into a peach band, followed by five restrained footer columns within 1312px and hairline dividers rather than a dark brand slab.

## Colors

### Brand

| Name | Value | Token | Roles | Use |
| --- | --- | --- | --- | --- |
| Tomato red | `#e34432` | `--color-action` | action | Primary button fill; used sparingly outside the product interface. |
| Brick label | `#cf3520` | `--color-eyebrow` | text | Occasional sentence-case audience eyebrow. |

### Accent

| Name | Value | Token | Roles | Use |
| --- | --- | --- | --- | --- |
| Resource blue | `#0f66ae` | `--color-resource-link` | link | Integration and technical-resource links. |
| Friendly blue | `#297abc` | `--color-link` | link | Story and editorial text links. |
| Salmon base | `#ffb399` | `--color-button-base` | accent | Exposed lower layer of the dimensional primary button. |
| Leaf green | `#4c7a45` | `--color-badge-ink` | text | Text within pale lime badges. |
| Selected peach | `#ffefe5` | `--color-selected` | surface | Selected capability selector backing. |
| Lime paper | `#f0f6df` | `--color-badge` | surface | Small status badges and collaboration-selector highlights. |
| Peach paper | `#fff6f0` | `--color-peach` | background, surface | Closing bands, footer and warm composition panels. |
| Sea-salt paper | `#f4fbf7` | `--color-mint-card` | surface | Testimonial cards among white story cards. |
| Butter paper | `#fff9eb` | `--color-butter` | background, surface | Integration panels and soft section washes; also the closing/footer variant for collaboration and story-library pages. |

### Neutral

| Name | Value | Token | Roles | Use |
| --- | --- | --- | --- | --- |
| Warm charcoal | `#25221e` | `--color-ink` | text | Headings, emphasized phrases and navigation. |
| Soft charcoal | `#6f6c69` | `--color-secondary` | text | Support copy; visible result of charcoal at 66% over the cream canvas. |
| Pencil grey | `#94928f` | `--color-tertiary` | text | Small annotations and de-emphasized descriptions; charcoal at 49% over cream. |
| Card edge | `#d7d6d4` | `--color-edge` | border | Visible charcoal-at-18% edge for cards, media and footer rules. |
| Table hairline | `#e4e3e1` | `--color-hairline` | border | Visible charcoal-at-12% line for lightly outlined cards and comparison rows. |
| Soft control grey | `#efeeec` | `--color-control` | surface | Tags and secondary controls; charcoal at 7% over the canvas. |
| Unselected paper | `#f9f7f6` | `--color-tile` | surface | Unselected feature selectors. |
| Cream paper | `#fefdfc` | `--color-canvas` | background | Default page canvas and navigation backing. |
| Interface white | `#ffffff` | `--color-white` | surface, text | Cards, interface panels and text on primary actions. |

### Page-type variants

| Only for | Name | Value | Token | Roles | Use |
| --- | --- | --- | --- | --- | --- |
| platform showcase sections | Device mint | `#ebf5f0` | `--color-device-stage` | background | Backing for multi-device product presentations. |
| culture and team pages | Meeting black | `#000000` | `--color-wall` | background | Narrow gutters behind the full-width portrait meeting grid. |
| culture and team pages | Portrait charcoal | `#1a1a1a` | `--color-portrait-base` | surface | Backing behind photographic member tiles. |

## Typography

- **Graphik-1bbd4a4c7a2fb472** — Marketing headlines and larger card headings. Geometric grotesk with open counters, a broad lowercase and a firm semibold voice. If unavailable, use **DM Sans**. Use weight 600 and preserve the measured line breaks and tracking. Font stack: "Graphik-1bbd4a4c7a2fb472", "DM Sans", "Helvetica Neue", Helvetica, Arial, sans-serif.
- **Inter-5486e50ce5a4efdf** — Paragraphs, navigation, actions, captions and metadata. Readable sans serif with medium-weight body copy and subtle positive tracking at small sizes. Font stack: "Inter-5486e50ce5a4efdf", "Helvetica Neue", Helvetica, Arial, sans-serif.
- **Shantell Sans-5a9740f6b2ed8488** — Human annotations next to proof or illustrations. Loose handwritten lettering, lightly irregular rather than decorative script. Font stack: "Shantell Sans-5a9740f6b2ed8488", Arial, sans-serif.
- **Caecilia-8d8a7c9be503e3f3** (only for long editorial testimonials in collaboration sections) — A standalone customer quotation beside a capability demonstration. Warm slab serif in italic, with unusually generous leading. If unavailable, use **Bitter**. Use regular italic, not a bold pull quote. Font stack: "Caecilia-8d8a7c9be503e3f3", "Bitter", "Times New Roman", serif.

| Recipe | Font | Weight | Size | Line height | Tracking | Use |
| --- | --- | --- | --- | --- | --- | --- |
| display | Graphik-1bbd4a4c7a2fb472 | 600 | 55px | 1.15 | -0.01em | Centered main marketing promise. |
| closing-heading | Graphik-1bbd4a4c7a2fb472 | 600 | 44px | 1.15 | -0.01em | Closing invitation; also editorial introduction and article section-heading variant. |
| heading | Graphik-1bbd4a4c7a2fb472 | 600 | 38px | 1.28 | -0.005em | Capability chapters and section leads. |
| card-heading | Graphik-1bbd4a4c7a2fb472 | 600 | 22px | 1.28 | normal | Integration panels, illustrated metrics and smaller marketing headings. |
| lead | Inter-5486e50ce5a4efdf | 500 | 20.5px | 1.6 | normal | Hero support and substantial section introductions. |
| handwritten | Shantell Sans-5a9740f6b2ed8488 | 400 | 19px | 1.6 | 0.01em | Brief handwritten asides and proof annotations. |
| primary-action | Inter-5486e50ce5a4efdf | 600 | 18.5px | 1.4 | 0.01em | Dimensional conversion button. |
| body | Inter-5486e50ce5a4efdf | 500 | 18px | 1.75 | 0.005em | Explanations and inline feature descriptions. |
| body-emphasis | Inter-5486e50ce5a4efdf | 600 | 18px | 1.75 | 0.005em | Leading action phrase within a feature selector. |
| eyebrow | Inter-5486e50ce5a4efdf | 600 | 17px | 1.4 | 0.01em | Sentence-case audience labels. |
| body-small | Inter-5486e50ce5a4efdf | 500 | 16px | 1.6 | 0.01em | Testimonial cards and plan feature lists. |
| minor | Inter-5486e50ce5a4efdf | 500 | 15.5px | 1.35 | 0.01em | Footer and resource links. |
| minor-strong | Inter-5486e50ce5a4efdf | 600 | 15.5px | 1.35 | 0.01em | Story-card titles and footer column headings. |
| navigation | Inter-5486e50ce5a4efdf | 500 | 15.5px | 1.35 | 0.01em | Navigation labels and story links. |
| compact-action | Inter-5486e50ce5a4efdf | 600 | 15.5px | 1.35 | 0.01em | Compact header conversion button. |
| caption | Inter-5486e50ce5a4efdf | 500 | 14.5px | 1.5 | 0.0125em | Availability note, attribution and comparison-table copy. |
| tag | Inter-5486e50ce5a4efdf | 500 | 14.5px | 1.35 | 0.01em | Industry metadata in soft rectangular tags. |

### Page-type variants

| Only for | Recipe | Font | Weight | Size | Line height | Tracking | Use |
| --- | --- | --- | --- | --- | --- | --- | --- |
| pricing, FAQ and editorial sections | subheading | Graphik-1bbd4a4c7a2fb472 | 600 | 31px | 1.28 | -0.02em | Plan names, FAQ heading and editorial subheads. |
| long editorial testimonials in collaboration sections | editorial-quote | Caecilia-8d8a7c9be503e3f3 | 400 italic | 22px | 1.8 | normal | Standalone long testimonial with attribution beneath. |
| FAQ sections | faq-question | Inter-5486e50ce5a4efdf | 475 | 17px | 1.4 | 0.01em | Question row in an accordion. |

**Notes:**

- Headings are semibold, not ultra-bold. Tighten only slightly at display sizes; keep body and UI tracking neutral or positive.
- The 44px editorial heading is a scoped alternative to the 55px marketing hero, not a reason to shrink ordinary landing-page openings.
- Use italics as a short conversational emphasis within a heading or in the editorial testimonial variant, not as the default display style.

## Layout

**Density:** Airy around major stories, comfortable inside panels; long breathing spaces separate approachable, compact interface demonstrations.

### Spacing

| Value | Use |
| --- | --- |
| 8px | Feature-selector stack gaps and metadata clusters. |
| 12px | Plan benefit-list gaps and small internal groups. |
| 16px | Story/quote-card padding and icon-to-text spacing. |
| 24px | Headline-to-support spacing, standard side padding and footer column gaps. |
| 32px | Support-to-action spacing, integration-panel padding and three-card grid gaps. |
| 40px | Heading-to-selector spacing in capability chapters. |
| 48px | Hero copy-to-media spacing and footer divider-to-links padding. |
| 64px | Large internal section breaks and desktop outer margin at 1440px. |
| 96px | Soft-band vertical breathing room. |
| 128px | Default major chapter separation and footer lead-in. |
| 192px | Extra-open collaboration chapters and prefooter gradient lead-in. |

### Containers and grids

- **wide-container**: max width 1312px · side padding 24px. Centered navigation, footer, plan grid and full marketing composition; at 1440px the content edges sit 64px inward.
- **media-container**: max width 1088px · side padding 24px. Centered hero demonstration, integration pair and social-proof grid.
- **heading-container**: max width 802px · side padding 24px. Centered main promise and closing copy; also single-column editorial content.
- **support-container**: max width 650px. Hero support and compact centered section introductions.
- **capability-pair**: 2 columns · gap 48px. Balanced text and demonstration columns; text commonly 500–600px wide and the visual about 590×550px. Alternate sides between chapters.
- **proof-grid**: max width 1088px · 3 columns · gap 32px. Mix white story cards with a mint quote card.
- **footer-grid**: max width 1312px · 5 columns · gap 24px. Five text-led navigation groups above identity, social and legal rows.
- **plan-grid** (only for pricing pages): max width 1312px · 3 columns · gap 16px. Equal plan cards, aligned prices and actions.

## Corner radius

| Element | Radius |
| --- | --- |
| compact-controls | 8px |
| story-cards | 10px |
| hero-media | 13px |
| feature-selectors-and-primary-actions | 15px |
| small-badge | 6px |

## Surfaces and depth

### Shadows

| Only for | Name | Value | Use |
| --- | --- | --- | --- |
|  | card-edge | `rgba(37, 34, 30, 0.04) 0px 1px 0px 0px` | Barely raised story cards. |
|  | hero-media | `rgba(37, 34, 30, 0.04) 0px 1px 1px 0px, rgba(37, 34, 30, 0.07) 0px 1px 4px -1px` | Subtle grounding for the large product demonstration. |
| collaboration offer sections | warm-offer | `rgba(42, 29, 48, 0.06) 0px 1px 19px 0px, rgba(250, 232, 214, 0.6) 0px 0px 48px 0px` | White offer panel backed by peach ribbon art. |

### Surfaces

#### Cream canvas · level 0

**Use:** Default marketing page.

**CSS:** `background: #fefdfc; color: #25221e`

**Observed:** The pale warm ground remains continuous through most chapters.

**Transfer:** Let whitespace carry the composition rather than enclosing every paragraph.

#### Outlined white card · level 1

**Use:** Proof, resource and offer content.

**CSS:** `background: #ffffff; border: 1px solid rgba(37, 34, 30, 0.18); border-radius: 10px; box-shadow: rgba(37, 34, 30, 0.04) 0px 1px 0px 0px`

**Observed:** The edge is more important than the shadow; card bodies remain white.

**Transfer:** Reserve raised containment for evidence or grouped resources.

#### Tinted composition panel · level 0

**Use:** Integration pairs and contained illustrated content.

**CSS:** `background: #fff9eb; border: 1px solid rgba(37, 34, 30, 0.12); border-radius: 15px; padding: 32px`

**Observed:** Butter and peach variants can sit side by side, with white subcards or logo tiles inside.

**Transfer:** Use one pale hue per panel; keep text charcoal.

#### Warm closing wash · level 0

**Use:** Closing invitation leading into the footer.

**CSS:** `background: linear-gradient(0deg, #fff6f0 58%, rgba(0, 0, 0, 0) 100%); padding-top: 96px`

**Observed:** The tint fades in from the canvas and then becomes a continuous peach footer. Collaboration and story-library endings use butter instead.

**Transfer:** Keep the final action inside a broad, soft tonal landing rather than an isolated promo card.

#### Mint quote paper · level 1

**Use:** Testimonial interruption within a story grid.

**CSS:** `background: #f4fbf7; border: 1px solid rgba(37, 34, 30, 0.18); border-radius: 10px; padding: 16px`

**Observed:** Text-first treatment shares the height and edge language of adjacent media cards.

**Transfer:** Use as a variation within proof, not the main page background.

#### Warm offer panel · level 1

**Only for:** collaboration offer sections

**Use:** A compact offer with benefits and a price.

**CSS:** `background: #ffffff; border: 1px solid rgba(37, 34, 30, 0.18); border-radius: 13px; padding: 48px; box-shadow: rgba(42, 29, 48, 0.06) 0px 1px 19px 0px, rgba(250, 232, 214, 0.6) 0px 0px 48px 0px`

**Observed:** An 800px-wide two-column panel floats above an oversized, very pale peach ribbon shape.

**Transfer:** Combine price, meaningful benefits and action without giving the panel a saturated fill.

#### Meeting wall · level 0

**Only for:** culture and team pages

**Use:** Full-width team portrait field.

**CSS:** `background: #000000; display: grid; gap: 4px; padding: 4px; grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr))`

**Observed:** Four columns at desktop; portraits fill 355×200px tiles backed by charcoal, with dark lower caption gradients.

**Transfer:** Make the darkness a frame for real people, not a general dark-mode theme.

## Components

### Navigation

**Use:** Persistent orientation at the top of a marketing page.

**CSS:** `background: #fefdfc; height: 72px; display: flex; align-items: center`

**Text style:** `navigation` — Inter-5486e50ce5a4efdf 500 · 15.5px/1.35 · tracking 0.01em

**Observed:** Identity at left, a fine vertical divider, short product/resource links, and login plus Compact button at right. Dropdowns use small down chevrons. The navigation sits in a sticky wrapper; the promotional strip below it is a separate campaign treatment.

**States:** Declared: hover navigation links gain rgba(37, 34, 30, 0.07) backing; focus-visible uses a layered ring with unresolved colors; active scales to 0.98.

**Transfer:** Keep the link list short and visually light; align it to the wide container.

### Primary button

**Use:** The main landing-page conversion action and repeated closing action.

**CSS:** `background: #e34432; color: #ffffff; height: 64px; padding: 12px 16px; border-radius: 15px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden`

**Text style:** `primary-action` — Inter-5486e50ce5a4efdf 600 · 18.5px/1.4 · tracking 0.01em

**Observed:** A separate salmon lower layer sits behind the face, leaving a 6px exposed base. Translucent diagonal ribbon-like highlights cross the face; the label stays above them. Width follows the label, about 149px for the sample.

**States:** Declared: hover translates the face down 2.5px; focus-visible uses two layered rings with unresolved colors and outline none; active translates down 5px.

**Transfer:** Construct a relative wrapper with 6px bottom space, a rounded salmon layer behind the lower half, and two low-opacity diagonal highlight shapes clipped inside the face.

### Compact button

**Use:** Header conversion action and compact plan actions.

**CSS:** `background: #e34432; color: #ffffff; padding: 9px 14px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center`

**Text style:** `compact-action` — Inter-5486e50ce5a4efdf 600 · 15.5px/1.35 · tracking 0.01em

**Observed:** A flat 39px-tall action without the dimensional base. Plan actions stretch to the column width; the entry plan instead uses the soft control-grey backing with charcoal text.

**States:** Declared: hover retains layer-defined colors; focus-visible uses layered rings with unresolved colors; active scales to 0.98.

### Text link

**Use:** Story and supporting exploration actions.

**CSS:** `color: #297abc; padding: 6.5px 10px; border-radius: 8px; display: inline-flex; align-items: center`

**Text style:** `navigation` — Inter-5486e50ce5a4efdf 500 · 15.5px/1.35 · tracking 0.01em

**Observed:** A small right chevron follows the label. Bleeding negative margins let the label align with card copy. Resource links use Resource blue and the Minor recipe with 9px 14px padding.

**Transfer:** Use verb-led links for optional deeper reading rather than another filled button.

### Feature selector

**Use:** Explain a capability while selecting the adjacent product scene.

**CSS:** `background: #f9f7f6; border-radius: 15px; padding: 16px 24px; position: relative; overflow: hidden`

**Text style:** `body` — Inter-5486e50ce5a4efdf 500 · 18px/1.75 · tracking 0.005em

**Observed:** Small icon at left, Body-emphasis phrase followed inline by a lighter explanation. Stack at 8px gaps. The selected item uses peach paper and a narrow progress-colored stripe at its left; collaboration variants use lime or butter paper.

**Transfer:** Keep one concise behavior per selector and show its matching visual rather than using generic feature cards.

### Story card

**Use:** Customer proof with a path to a longer story.

**CSS:** `background: #ffffff; border: 1px solid rgba(37, 34, 30, 0.18); border-radius: 10px; box-shadow: rgba(37, 34, 30, 0.04) 0px 1px 0px 0px; display: flex; flex-direction: column`

**Text style:** `minor-strong` — Inter-5486e50ce5a4efdf 600 · 15.5px/1.35 · tracking 0.01em

**Observed:** A roughly 1.9:1 image sits flush at the top. The body has 16px padding, a compact multi-line title, a blue Text link and metadata tags toward the bottom.

**Transfer:** Match the card geometry across photographic stories and text-only proof.

### Quote card

**Use:** A human voice within a grid of story cards.

**CSS:** `background: #f4fbf7; border: 1px solid rgba(37, 34, 30, 0.18); border-radius: 10px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; gap: 24px`

**Text style:** `body-small` — Inter-5486e50ce5a4efdf 500 · 16px/1.6 · tracking 0.01em

**Observed:** Quote first, small circular portrait and name/role below, with a story link or tags at the foot. This card does not use a giant decorative quotation mark.

**Transfer:** Use a genuine short quote at the same scale as surrounding explanatory text.

### Metadata tag

**Use:** Story categories and small contextual labels.

**CSS:** `background: rgba(37, 34, 30, 0.07); color: rgba(37, 34, 30, 0.66); border-radius: 8px; padding: 7px 9px`

**Text style:** `tag` — Inter-5486e50ce5a4efdf 500 · 14.5px/1.35 · tracking 0.01em

**Observed:** Soft rectangular chips, not full pills; several can wrap at 8px gaps.

### Footer columns

**Use:** Final navigation and identity area.

**CSS:** `display: grid; grid-template-columns: repeat(auto-fit, minmax(min(192px, 100%), 1fr)); gap: 24px`

**Text style:** `minor` — Inter-5486e50ce5a4efdf 500 · 15.5px/1.35 · tracking 0.01em

**Observed:** Five columns use Minor-strong headings with 24px space before links. A top rule and 48px padding introduce the links; a second rule precedes the monochrome identity, short mission line and social icons. The final row has small legal links at left and a grey language select at right.

**Transfer:** Continue the closing band's tint through the footer. Keep the identity row secondary to the final conversion.

### Plan card

**Only for:** pricing pages

**Use:** Compare offers without dramatic preferred-plan styling.

**CSS:** `background: #ffffff; border: 1px solid rgba(37, 34, 30, 0.12); border-radius: 10px; padding: 24px 32px`

**Text style:** `subheading` — Graphik-1bbd4a4c7a2fb472 600 · 31px/1.28 · tracking -0.02em

**Observed:** Audience label, plan name, brief purpose, compact price and billing note, full-width action, then a 12px-gap checkmarked benefit list. Paid plans have red actions; the free entry uses grey. The price numeral is compact rather than a huge display figure.

**Transfer:** Keep comparable information aligned and distinguish tiers through content, not a single giant colored card.

### FAQ row

**Only for:** FAQ sections

**Use:** Resolve detailed buying objections.

**CSS:** `border-top: 1px solid rgba(37, 34, 30, 0.18); min-height: 64px`

**Text style:** `faq-question` — Inter-5486e50ce5a4efdf 475 · 17px/1.4 · tracking 0.01em

**Observed:** Question button spans an 802px column with a plus at the right. Its hit area uses 15px 12px padding and bleeds 12px past the text edges; answers expand below in readable prose.

**States:** Declared: hover on the question button uses rgba(37, 34, 30, 0.07).

## Imagery and graphics

### Folded product stage

**Use:** Hero demonstration and recurring capability scenes.

**Observed:** Crisp white application windows and occasional phone hardware sit over peach ribbon folds with creamy highlights. The large hero is a 1088×612px rounded landscape frame; paired chapter visuals are roughly square. Interfaces are tightly framed to show a meaningful action rather than a whole unreadable dashboard.

**Transfer:** Recreate a believable interface with one focal workflow. If no product media exists, draw a small, legible application panel showing input, action and result on the same folded pastel backing.

**Build:** Within a rounded overflow-hidden frame, use a peach base and layer three wide curved SVG bands crossing diagonally from lower left toward upper right. Give each band a translucent white highlight along one edge and a soft peach shadow along the opposite edge. Place a white interface panel over these folds with a faint charcoal border and low-opacity shadow; keep the paper detail behind the panel, not over the text.

### Paper metaphor landscape

**Use:** A signature visual interruption that makes an abstract benefit tangible.

**Observed:** Mint rolling paper terrain carries scattered folded envelopes, notes, folders, clocks and check-shaped objects in yellow, green and coral. Objects have faceted sides, matte highlights and soft shadows. The landscape spans the page while centered copy remains on open cream above it; smaller versions become isolated sculptural metrics or tile illustrations.

**Transfer:** Choose recognizable objects from the new product's world and reduce them to a friendly paper collage. Include at least one metaphor illustration, with a few faceted SVG objects as the minimum version.

**Build:** Draw two or three long overlapping SVG wave paths across a full-width stage, using pale mint fills fading into cream. Add sparse circles, stars and 40–120px geometric objects with polygon side faces; use butter, leaf-green and salmon families, lighter top faces and low-opacity charcoal shadows. Keep the center near the headline uncluttered and concentrate objects around the lower and outer edges. For a metric, isolate one paper sculpture above a 22px semibold number and an 18px muted label.

### Handwritten wayfinding

**Use:** An informal aside near proof or integration illustrations.

**Observed:** Short grey handwritten labels accompany a curved arrow; their irregularity contrasts with otherwise disciplined sans-serif copy.

**Transfer:** Write a short useful aside about the new content, not a second headline.

**Build:** Set Shantell Sans at 19px/1.6 and 0.01em tracking in secondary charcoal. Draw a thin SVG curved path with a small open arrowhead beneath or beside it, pointing into the relevant object; keep it compact and unboxed.

### Portrait collage stories

**Use:** Customer-story imagery and selected proof sections.

**Observed:** Black-and-white cutout portraits sit over bright but softly lit illustrated office objects, pastel blocks, mint ribbons and yellow stationery. Some team images remain in natural color. These horizontal images occupy the top half of a proof card rather than filling whole sections.

**Transfer:** Use authentic portraits, remove the background and combine with two or three relevant paper-like props. A monochrome portrait over simple pale geometric planes is an acceptable minimum.

### Device family

**Only for:** platform showcase sections

**Use:** Make availability feel concrete.

**Observed:** White or silver devices show light interfaces against a mint stage; a smaller floating composition combines phone, tablet and watch. Large presentations include platform tabs above the media.

**Transfer:** Show only supported device types; use the same light interface and soft pastel backing across them.

### Team documentary and meeting wall

**Only for:** culture and team pages

**Use:** Make the organization tangible through actual people.

**Observed:** The introduction uses a broad natural-color team photograph in an 802×451px rounded carousel with a 31px location/year caption and previous/next controls. Later, a full-bleed four-column webcam portrait wall has 4px black gutters, 355×200px tiles, lower dark gradients, white names and roles, and a floating white meeting-style toolbar.

**Transfer:** Use unstaged environmental group photos and real webcam portraits rather than glossy headshot stock. Keep the video-meeting framing specific to team storytelling.

**Build:** Use the Meeting wall surface, 16:9 object-cover portraits and an absolute lower-half gradient from transparent to rgba(0,0,0,0.7). Add a compact white rounded toolbar over the lower part of the field with title, call icons and a filter; keep tile labels readable.

### Icons

**Observed:** Small simple SVG silhouettes and open line-like glyphs, commonly 18×18px or 20×20px, with 16px variants. Neutral charcoal or grey icons precede feature text; small chevrons follow links and indicate dropdowns. Decorative paper illustrations are a separate, larger visual language.

**Transfer:** Choose restrained, friendly icons with clear silhouettes. Keep them subordinate to text and do not replace the paper illustrations with oversized UI glyphs.

## Section recipes

How recurring sections are built.

### First screen: Centered promise and product stage

**Observed:** A 72px navigation bar on Cream canvas anchors the top. Below it, the main promise occupies a centered 802px block, starting around 200px down the desktop screen and wrapping into two balanced lines in Display. A 650px Lead paragraph follows after 24px. One Primary button sits 32px below the support, followed by a small muted availability note. After 48px, the 1088×612px Folded product stage begins: its upper 258px is visible within the first 900px, showing the pale peach stage and the top of a white application window; its lower detail and subsequent proof fall below the fold. Layers are cream ground, peach paper stage, white product panel and restrained interface details. A separate narrow campaign strip can sit below navigation, but it is not part of the core promise.

**Transfer:** Keep the centered text-to-action-to-object hierarchy with a new benefit and an equally legible workflow mockup if finished product media is unavailable. Collaboration openings replace the large first object with a wide illustrated logo/proof ribbon; pricing opens with a short title and review badge above controls and plans; story libraries open with a broad proof promise and illustrated divider; editorial openings use Closing-heading and a documentary photograph.

**Avoid:** Do not turn the default opening into a split hero, an edge-to-edge headline or a card grid. Do not hide the main product object entirely below the first screen.

**Text style:** `display` — Graphik-1bbd4a4c7a2fb472 600 · 55px/1.15 · tracking -0.01em

### Capability chapter

**Observed:** Capability-pair layout balances a Heading and optional Lead against a roughly 590×550px Folded product stage. After about 40px, Feature selectors form a tight stack with the selected item tinted; later chapters alternate the visual side. Major chapters have 128px breathing room, with the collaboration variant using 192px.

**Transfer:** Map each selector to a meaningful product state. Keep the narrative about user outcomes and let each visual show the relevant behavior.

**Text style:** `heading` — Graphik-1bbd4a4c7a2fb472 600 · 38px/1.28 · tracking -0.005em

### Audience heading and paired panels

**Observed:** A sentence-case brick Eyebrow sits 24px above a centered Heading, followed by support. A 64px gap leads to two 528px-wide Tinted composition panels with a 32px gutter. One uses butter paper and a grid of white logo tiles; the other uses peach paper and stacked technical resource cards. Handwritten wayfinding loosens the system.

**Transfer:** Use the panel pair to explain two complementary ways to extend or apply a product, not necessarily integrations.

**Text style:** `heading` — Graphik-1bbd4a4c7a2fb472 600 · 38px/1.28 · tracking -0.005em

### Human proof grid

**Observed:** A centered Heading leads a three-column Proof-grid after 48px. Story cards alternate with a Mint quote paper card. Compact blue links and metadata sit low in each card; a centered supporting link and compact action can follow.

**Transfer:** Mix concrete customer outcomes with a genuine first-person voice instead of repeating three identical feature cards.

### Illustrated metrics

**Observed:** A left-aligned Heading, Lead and story link sit opposite isolated paper sculptures. Each sculpture has a modest 22px semibold metric below and an 18px grey explanatory label. A row of small white quote cards follows.

**Transfer:** Use verified proof with a metaphor object above each metric; retain the modest numeral scale rather than turning this into a giant-number dashboard.

### Warm closing and continuous footer

**Observed:** Warm closing wash carries a centered 44px invitation, short proof/support and Primary button; a secondary pricing link can sit beside it. An oversized task-like white row with small avatars can mediate between copy and actions. The peach tint continues into Footer columns, separated by hairlines. The collaboration variant uses a 38px invitation and an 802px FAQ below it on butter paper; the story-library variant uses a small award above the 44px invitation; the pricing variant uses a row of award laurels and an FAQ text link.

**Transfer:** End on reassurance and one clear next step. Translate the task-like row into a simple result artifact appropriate to the product, and preserve the gentle color landing and structured footer.

### Pricing and comparison

**Only for:** pricing pages

**Observed:** A centered Display title and compact review badge precede billing/currency controls and three equal Plan cards on a peach wash. A small security strip separates them from a white outlined comparison panel. The comparison uses four columns, compact 14.5px copy, repeated 1px rules and grouped category headings; plan actions stay visible in a repeated top summary.

**Transfer:** Keep top-level choice simple and move technical differences into a structured table. End with awards or verified proof, a 38px invitation, action and FAQ link before the peach footer.

### Filtered story library

**Only for:** customer story libraries

**Observed:** An illustrated mint landscape separates a centered promise from a wide library. A 280px filter list occupies the left side; story content fills the right in alternating two- and three-card groupings with mint quote cards mixed in. The selected filter has a fine red left marker. A small butter submission strip sits above the closing call.

**Transfer:** Use category filtering only when the library warrants it, and vary card spans without creating a loose staggered masonry collage.

### Editorial narrative and people field

**Only for:** culture and team pages

**Observed:** An 802px single column uses 44px section headings and 20.5px/1.6 prose. Illustrated value rows have fine dividers and 32px vertical padding. Four compact 31px statistics are separated by muted middle dots before the full-width Meeting wall. The close returns to cream and peach with a 44px recruitment invitation and a plain red 64px action.

**Transfer:** Use a narrow editorial story and grounded visual evidence before any immersive people field. The enormous portrait wall belongs to organizational storytelling, not ordinary product pages.

## Page flow

**Storyline:** Plainspoken promise → tangible product behavior → human or quantified proof → deeper capability and trust → reassuring next step → warm, useful footer.

### Flagship product landing page

1. **Promise** — Centered two-line benefit, support, dimensional red action and large folded-paper product stage.
2. **Problem reframing** — Illustrated landscape turns scattered work into a single coherent metaphor.
3. **Capability chapters** — Alternating interface demonstrations with short selector stacks, interrupted by paired extension panels.
4. **Social proof** — Mixed story and quote cards, device family, illustrated metrics and testimonial row.
5. **Closing call** — Centered invitation and product-like artifact dissolve into peach, followed by the five-column footer.

**Transfer:** Choose the most persuasive chapters for the new product; keep the interplay of concrete workflow and light human illustration.

### Audience-specific collaboration landing page

1. **Promise** — Centered leadership-oriented benefit and action above an illustrated logo ribbon.
2. **Product demonstration** — Context-focused feature pair and a large guided walkthrough with play overlay.
3. **Human proof** — Short story beside a portrait collage, then more capability chapters and a serif testimonial.
4. **Offer and reach** — White two-column offer panel on peach ribbon art, device showcase and three illustrated resource tiles.
5. **Objection handling** — Butter-tinted invitation followed by FAQ rows and the continuous butter footer.

**Transfer:** Lead with the audience's burden, show a believable workflow and use FAQs to address adoption concerns.

### Plan selection and detailed evaluation

1. **Orientation** — Simple title, review badge and billing/currency controls.
2. **Pricing** — Three equal white plan cards on a peach wash.
3. **Detailed comparison** — Security strip then a large ruled four-column comparison with repeated plan summaries.
4. **Closing call** — Award row, compact social-proof invitation, primary action and FAQ link above a peach footer.

**Transfer:** Separate quick choice from exhaustive comparison and keep prices typographically restrained.

### Customer proof discovery

1. **Proof promise** — Centered headline over an illustrated mint divider and handwritten aside.
2. **Evidence library** — Left category filters beside mixed-width story cards and mint quotes.
3. **Contribution prompt** — Small pale strip inviting another story.
4. **Closing call** — Award, invitation, review proof and primary action on butter, continuing into the footer.

**Transfer:** Let readers identify with a relevant story category and keep testimonials integrated with the browsing system.

### Organizational trust and recruitment

1. **Mission** — Smaller editorial hero with natural team-photo carousel and location caption.
2. **Narrative** — Narrow-column story and illustrated, divided principle rows.
3. **Quantified proof** — Compact dot-separated statistics support the working model.
4. **Human evidence** — Immersive full-width webcam portrait wall with meeting-style toolbar.
5. **Closing call** — Warm recruitment invitation and plain red action flow into the peach footer.

**Transfer:** Use a real organizational narrative and people, not product-page sales rhetoric.

## Writing

Warm, plainspoken and confident, with a little dry humor. Benefits sound like relief from familiar friction, while supporting copy explains concrete behavior rather than grand technological ambition.

**Do not copy:** Do not reuse the brand name, logo, product names, customer identities, quotations, award badges or factual claims and numbers. Replace all examples and proof with the new product's own verified material. The examples below show the pattern only; write new copy for the new product.

- **Addressing the reader:** Speak directly to you and your team. Use we for the people behind the product and name the product naturally where a promise needs an anchor.
- **Rhythm:** Headlines are usually one compact thought across one or two lines, often 6–12 words. Support uses one or two clear sentences. Parallel phrases, contractions and a brief parenthetical aside provide human rhythm.

| Role | Pattern | Typical length | Examples of the pattern |
| --- | --- | --- | --- |
| Hero headline | Name a familiar burden or promise a behavior the reader wants to sustain. | 6–12 words | “The task system you’ll actually stick with”<br>“Stop carrying the team. Start leading it.” |
| Supporting line | Explain what changes in everyday work and finish with a low-drama benefit. | 18–35 words | “Capture tasks from anywhere and put routines on repeat. [Brand] keeps everyone on schedule – no chasing required.” |
| Section heading | Use an active verb or a concrete contrast instead of a feature taxonomy. | 5–12 words | “Put the context where the work lives”<br>“No need to ask how things are going” |
| Eyebrow | Brief sentence-case audience cue, not a shouting label. | 2–4 words | “For systems people” |
| Primary action | A short verb phrase lowers the commitment barrier. | 2–4 words | “Start for free”<br>“See open roles” |
| Human aside | Light reassurance in parentheses or an unfinished conversational phrase. | 3–12 words | “... and many more!”<br>“Available on phone, tablet, watch, desktop, and the web (yep, all of them)” |
| Closing invitation | Collaborative invitation returns to the opening desire. | 7–12 words | “Let’s build the system you’ve been looking for” |

**Words and phrasing to use:** lightweight; simple yet powerful; your team; one system; keep work moving; out of your head; no chasing required; actually; work and life

**Avoid:** revolutionary ecosystem; 10x everything; dominate; synergy; enterprise transformation jargon; unqualified superlatives

**Rules:**

- Lead with a real everyday friction, then explain the product mechanism.
- Start feature explanations with a short bold behavior phrase and continue in ordinary language.
- Keep technical terms in clearly identified resource panels rather than the main emotional promise.
- Make proof specific and attributable; use restrained confidence instead of hype.
- Allow one human aside where it helps reassurance, not a joke in every block.

## Do's and Don'ts

### Do

- Use the 55px/1.15 semibold display recipe for the default centered promise.
- Keep long support copy within 650px and standard centered heading blocks within 802px.
- Use 8px gaps between feature selectors and 32px gaps in the three-card proof grid.
- Keep red concentrated in small conversion actions while broad bands stay peach, butter or cream.
- Give product stages 13–15px rounded edges and barely visible charcoal borders.
- Include a paper metaphor and a short 19px handwritten annotation to counterbalance precise interfaces.
- Continue the closing tint through five footer columns with 24px gutters.
- Keep proof metrics modest at 22px and let the illustration above carry the visual emphasis.

### Don't

- Do not replace geometric semibold headings with an ultra-bold rounded display or a default serif.
- Do not use full-pill corners for standard buttons, tags or cards; their corners are 8–15px.
- Do not turn secondary text pure black; retain the 66% and 49% charcoal hierarchy.
- Do not apply dramatic floating-card shadows to every panel; the standard story-card shadow is only a 1px edge.
- Do not expand tomato red into large section backgrounds or use neon gradients in the paper stages.
- Do not style pricing numerals as enormous display counters; the comparison is deliberately compact.
- Do not make the culture portrait wall's black gutters a general dark page theme.
- Do not remove white space to pack every section into a dense feature matrix; chapter separation is commonly 128px.

## Motion and responsive

### Motion

**Observed:**

- Declared common action transitions use transform and background-color over 0.15s with cubic-bezier(.2, .8, .2, 1).
- The dimensional action face declares 2.5px hover and 5px active downward movement; compact controls declare active scale(0.98).
- A shimmer animation is declared at 1.5s ease infinite. A stats marquee declares 30s linear infinite; feature scenes change with the selected explanation.
- Some media and panel opacity transitions declare 0.3s ease-in-out.

**Transfer:**

- Keep the dimensional button's movement inside its exposed salmon base.
- Use changes in the selected feature and matching product scene as the main narrative motion, retaining a readable static scene.
- Keep decorative shimmer confined to the main conversion object rather than applying it to every card.

**Unknown:**

- Exact scroll choreography and scene timing are not established.
- Several focus-ring declarations retain unresolved layer colors; their exact palette is unknown.

### Responsive

**Observed:**

- Declared width breakpoints are 376px, 768px and 1200px.
- Proof grids use auto-fit with a minimum of min(250px, 100%); plan grids use min(300px, 100%); footer columns use min(192px, 100%).

**Transfer:**

- Retain the centered promise and product-stage relationship when narrowing the layout.
- Let the measured auto-fit card and footer grids wrap instead of shrinking their text.
- For paired capability chapters, stack the text and related scene together on narrow screens; keep the selector and visual association clear.

**Unknown:**

- Mobile headline sizes, exact navigation collapse behavior and mobile scroll scenes are not established.

## How to use this guide

1. Start from the Essentials and the first-screen recipe; where the guide offers variants, use the default named for a new marketing page.
2. Plan the page before building: map your content onto the section recipes and page flow, then check the plan against the Do's and Don'ts.
3. Build with the tokens and component specs; recreate signature graphics with their build recipes instead of generic decoration, and use the named font substitutes if a font is unavailable.
4. Render the page at desktop and mobile widths, compare it with the Essentials and the Don'ts, and fix the differences before you finish.
