# Xwavy image and video prompts (male cast, UAE)

Every photo and the hero video on the site, rewritten with a male-only Emirati / Gulf cast. Each prompt is self-contained: paste it as-is into the generator (Midjourney v7, Imagen 4, GPT-Image, Flux 1.1 Pro, Higgsfield Soul; video in Veo 3, Kling 2.x or Runway Gen-4).

**Drop-in rule:** export each image as `.webp` at the size listed, with the exact file name, into `public/images/people/` (video files into `public/videos/`). The site picks them up with no code change. After swapping, tell Claude so the alt text (English and Arabic) is updated to match the new people.

---

## 1. Cast bible (keep identical across every image)

Generate the two leads first as character reference sheets, then pass them as reference images / character references in every prompt so the faces stay the same.

**The innovator — "Khalid"**
Emirati man, 28, warm light-olive to medium-tan Gulf skin with natural texture, short neat black beard with a clean fade, short dark hair, dark brown eyes, slim build. Founder look: navy overshirt or dark knit polo over a white crew-neck tee, dark chinos, a simple steel watch. Calm, focused, quietly confident; not a stock-photo grin.

**The investor — "Saeed"**
Emirati man, 45, warm medium-tan Gulf skin, short salt-and-pepper beard neatly trimmed, crisp white kandura, white ghutra worn neatly with black agal (or no headwear for indoor desk shots, same face), slim gold-rimmed glasses optional, a dark leather folio. Composed, attentive, experienced; listens more than he talks.

**The reviewer — "Omar"** (only in the review and team shots)
Gulf Arab man, 34, light-olive skin, short dark hair, close-trimmed beard, thin black-framed glasses, light grey Oxford shirt with sleeves folded once, careful and thoughtful.

**Team extra** (team shot only): a South-Asian-heritage UAE resident man, early 30s, medium-brown skin, clean-shaven, charcoal shirt. Shows the UAE's mixed professional community without adding women.

## 2. Look and rules (applies to every prompt)

- **Grade:** cinematic editorial photography, Dubai / Abu Dhabi evening. Deep navy and ink-blue shadows, warm tungsten practical lights, a single cool cyan accent (a screen glow or reflection) and a touch of warm gold. No colour gradients, no neon, no teal-and-orange cliché.
- **Camera:** full-frame look, 35 mm or 50 mm lens, f/2 to f/2.8, natural skin texture with visible pores, real fabric creases, subtle film grain. Not plastic or airbrushed, not "AI glossy".
- **Places:** modern Gulf interiors: warm oak, travertine, dark stone, linen, palm or olive plants, mashrabiya-pattern screens or soft arabesque shadows. A Dubai skyline may sit soft and out of focus in the far background; no London or New York skylines, no recognisable landmarks in sharp focus.
- **Screens:** any phone, tablet or laptop screen faces the camera or sits at three-quarter angle toward camera, showing a clean minimal dark-navy interface with abstract cards and a cyan button. No readable text, numbers, logos or brand names anywhere: screens, mugs, notebooks, signs, laptops (no Apple logo).
- **People:** men only. Modest, professional, culturally respectful. Hands natural (five fingers, relaxed). No alcohol, no cigarettes.

**Negative prompt (paste where supported):**
`women, female, girl, text, letters, numbers, watermark, logo, brand name, apple logo, readable screen, gibberish text, neon, gradient background, oversaturated, plastic skin, airbrushed, extra fingers, deformed hands, cartoon, 3d render, illustration, London skyline, New York skyline, cluttered background, harsh flash`

---

## 3. Hero video: `public/videos/hero-film.mp4` + `.webm` + poster

> Not used at the moment: the home hero is a still, two-portrait design. Kept for reference in case a hero film returns.

**Spec:** 10 seconds, seamless loop, 1920×1080 (16:9), 24 or 25 fps, no audio. The site plays it muted inside a widening "film window", so keep the action in the centre 60% of the frame and leave calm space at the edges.

**How to get a perfect loop:** generate the first keyframe as a still (prompt A), then run image-to-video with **the same image as both the first and the last frame** (Veo 3 / Kling 2.x "start and end frame", Runway Gen-4 keyframes). If the tool has no end-frame option, generate 10 s and cross-fade the last 1 s into the first 1 s in an editor.

**Prompt A (keyframe still, 16:9):**
> Cinematic wide shot at blue hour inside a modern Dubai co-working lounge with floor-to-ceiling glass, a soft out-of-focus city skyline far behind. On the left, a 28-year-old Emirati founder with warm light-olive skin, short neat black beard, navy overshirt over a white tee, sits at a warm oak table with an open laptop facing three-quarters toward camera, its dark-navy interface glowing faint cyan. On the right, across the room in a separate armchair, a 45-year-old Emirati investor in a crisp white kandura and neat white ghutra holds a tablet angled toward camera, its screen showing abstract dark cards. Between them, a long travertine table with a single small olive plant, warm tungsten pendant lights, arabesque mashrabiya shadows across the floor. Deep navy shadows, warm gold highlights, one cyan screen glow, natural skin texture, 35 mm, f/2.8, subtle film grain, no text anywhere.

**Prompt B (video, image-to-video from A, start = end frame):**
> Ten-second seamless loop. Very slow, steady dolly-in of about 5 percent toward the centre of the room, then an equally slow ease back to the exact starting position, so the final frame matches the first. The founder types briefly, pauses, and glances up thoughtfully; the investor scrolls once on his tablet, then looks up and gives a small, approving nod toward the founder's side of the room. Pendant lights flicker gently, faint movement in the plant leaves from air conditioning, the soft city lights shimmer far behind the glass. Natural, unhurried, realistic motion; no cuts, no camera shake, no text, no logos, no women. Cinematic blue-hour grade, deep navy shadows, warm tungsten practicals, single cyan screen glow.

**Poster** (`hero-film-poster.webp`, 1920×1080): export the first frame of the final video.

---

## 4. Story photographs (`public/images/people/`)

### `innovator-portrait.webp`: 1536×1024 (3:2)
Used: home "Roles" (cropped to the left third) and the For innovators hero (cropped to the centre-right). Keep Khalid between 30% and 60% of the frame width.
> Editorial portrait at night of a 28-year-old Emirati founder with warm light-olive skin, short neat black beard and clean fade, wearing a navy overshirt over a white tee, sitting at a warm oak desk in a modern Dubai apartment-studio, laptop open at a three-quarter angle toward camera with a dark-navy interface glowing soft cyan. He leans back slightly, one hand resting near the trackpad, looking just off-camera with calm, focused confidence. Behind him, floor-to-ceiling glass with soft out-of-focus city lights, a tall olive plant, warm tungsten desk lamp. Deep navy shadows, warm gold highlights, 50 mm, f/2, natural skin texture, subtle grain, no text or logos anywhere.

### `investor-portrait.webp`: 1122×1402 (4:5 portrait)
Used: home "Roles" and the For investors page. Keep his face in the top 25 to 40% of the frame.
> Vertical editorial portrait at dusk of a 45-year-old Emirati investor with warm medium-tan skin and a short salt-and-pepper beard, wearing a crisp white kandura and neatly folded white ghutra with black agal, standing beside a tall office window in a modern Abu Dhabi tower. He holds a tablet loosely at his side with its dark screen angled toward camera, gazing out thoughtfully. Soft out-of-focus city lights and a warm sunset band on the horizon, dark stone and walnut interior, arabesque screen shadow on the wall. Deep navy shadows, warm gold rim light on the kandura, 50 mm, f/2.2, natural skin texture, subtle grain, no text or logos.

### `step-1-post.webp`: 1448×1086 (4:3)
Process step 1, "Post your idea".
> Over-the-shoulder three-quarter shot at night of a 28-year-old Emirati founder with warm light-olive skin and a short neat black beard, navy overshirt, filling in a step-by-step form on a laptop at a warm oak kitchen-island desk. The laptop screen faces three-quarters toward camera, showing a clean dark-navy form with five small progress dots and abstract input lines in cyan, nothing readable. A small cup of Arabic coffee (dallah cup) beside him, notebook with blank pages, warm pendant light above, soft city lights through the window. Focused, quiet moment. Deep navy shadows, warm tungsten light, 35 mm, f/2.8, natural texture, subtle grain, no text or logos.

### `step-2-review.webp`: 1448×1086 (4:3)
Process step 2, "A person reviews it"; also used on the For innovators review card.
> Daylight-to-evening shot of a 34-year-old Gulf Arab reviewer with light-olive skin, close-trimmed beard and thin black-framed glasses, light grey Oxford shirt with sleeves folded once, reading a submission carefully on a large monitor angled toward camera at a tidy oak desk. The monitor shows an abstract dark-navy document layout with a cyan highlight bar, nothing readable. A pen in his hand, a notebook with blank ruled lines, a small plant, soft window light mixed with a warm desk lamp, calm modern Dubai office with travertine wall. Careful, thoughtful expression. 50 mm, f/2.8, natural skin texture, subtle grain, no text or logos.

### `step-3-discover.webp`: 1448×1086 (4:3)
Process step 3, "Investors discover"; also For investors and Ideas pages.
> Evening shot of a 45-year-old Emirati investor with warm medium-tan skin and a short salt-and-pepper beard, in a white kandura without headwear, seated in a leather lounge chair, browsing a grid of idea cards on a tablet held up so the screen faces three-quarters toward camera: abstract dark-navy cards with small cyan and gold tags, nothing readable. Warm walnut side table with a small cup of Arabic coffee, arabesque mashrabiya shadow on the wall, soft city lights through the glass. Relaxed, curious expression. Deep navy shadows, warm tungsten light, 50 mm, f/2.2, natural texture, subtle grain, no text or logos.

### `step-4-request.webp`: 1448×1086 (4:3)
Process step 4, "Request an introduction".
> Close medium shot of a 45-year-old Emirati investor with warm medium-tan skin and short salt-and-pepper beard, white kandura and neat white ghutra, at a dark stone desk about to tap a cyan button on a tablet propped toward camera; the screen shows an abstract dark-navy message card with a cyan send button, nothing readable. His other hand rests on a dark leather folio. Slight forward lean, deliberate and considerate. Soft out-of-focus Abu Dhabi evening lights behind, warm desk lamp, deep navy shadows, warm gold highlights, 50 mm, f/2, natural skin texture, subtle grain, no text or logos.

### `step-5-connect.webp`: 1448×1086 (4:3)
Process step 5, "Both say yes"; also For innovators "When an investor asks". The phone screen must face the camera.
> Night shot of a 28-year-old Emirati founder with warm light-olive skin and a short neat black beard, navy overshirt, standing by a window in a modern Dubai apartment, smiling with quiet relief at his phone held up so the screen faces the camera, showing an abstract dark-navy interface with a large cyan check-mark circle, nothing readable. Laptop open behind him on a warm oak desk, soft city lights through the glass, warm tungsten lamp. Genuine, understated happiness. Deep navy shadows, warm gold highlights, 50 mm, f/2, natural texture, subtle grain, no text or logos.

### `investor-unlock.webp`: 1536×1024 (3:2)
Used: home "Access" background (shown dim, behind text), How it works layers. Keep it calm, with no strong focal point in the centre-left.
> Close-up from slightly above of a tablet lying on a dark walnut desk, screen facing camera, showing an abstract full idea profile in dark navy: chart shapes, team avatar circles as plain silhouettes, document tiles, cyan and gold accents, nothing readable. A man's hand in a white kandura sleeve rests at the edge of the tablet, a steel pen and a small cup of Arabic coffee beside it, arabesque shadow falling across the desk. Low warm side light, deep navy shadows, shallow depth of field, 50 mm, f/2.8, subtle grain, no text or logos.

### `together.webp`: 1536×1024 (3:2)
Used: home "Consent" (wide) and How it works hero (cropped to the centre). Keep both men inside the centre 70%.
> Warm evening shot of a 28-year-old Emirati founder (light-olive skin, short black beard, navy overshirt) and a 45-year-old Emirati investor (medium-tan skin, salt-and-pepper beard, white kandura and white ghutra) seated across a low travertine table in a quiet hotel majlis lounge, talking after their introduction. The founder gestures while explaining, the investor listens and smiles slightly, a closed laptop and two small cups of Arabic coffee on the table. Mashrabiya screen and palm behind, warm lantern light, deep navy shadows, warm gold highlights, 35 mm, f/2.8, natural skin texture, subtle grain, no text or logos.

### `team.webp`: 1672×941 (16:9)
Used: home "Trust", the human review team.
> Natural candid shot of three men reviewing ideas together around an oak meeting table in a calm modern Dubai office: a 34-year-old Gulf Arab man with glasses and a grey Oxford shirt pointing at a laptop angled toward camera; a 40-year-old Emirati man in a white kandura without headwear taking notes in a notebook with blank pages; a South-Asian-heritage man in his early 30s in a charcoal shirt listening. The laptop shows an abstract dark-navy layout with cyan highlights, nothing readable. Soft daylight from a large window with sheer linen curtains, travertine wall, olive plant. Thoughtful, collaborative mood, 35 mm, f/4, natural textures, subtle grain, no text or logos.

### `the-meeting.webp`: 1916×821 (21:9 wide)
Used: closing call to action on every page; a card covers the left 45%, so keep both men in the right half (crop focus around 70%).
> Ultra-wide cinematic shot at golden hour on a rooftop terrace café in Dubai: on the right half of the frame, a 28-year-old Emirati founder (light-olive skin, short black beard, navy overshirt) and a 45-year-old Emirati investor (medium-tan skin, salt-and-pepper beard, white kandura and white ghutra) sit at a small round stone table in relaxed conversation, the founder explaining with an open hand, the investor leaning in, listening. Two small cups of Arabic coffee, a closed notebook. The left half of the frame is soft and calm: palm fronds, warm out-of-focus city towers and sky. Warm gold sunlight, deep navy shadows, 35 mm anamorphic look, f/2.8, natural skin texture, subtle grain, no text or logos.

---

## 5. New shots for the remaining pages

### `about-majlis.webp`: 1536×1024 (3:2), About hero
> Wide, calm interior of a modern Emirati majlis-inspired meeting room at blue hour: low cushioned seating in linen, a long travertine table, warm lantern light, a mashrabiya screen casting arabesque shadows, tall window with soft out-of-focus city lights. In the middle distance, a 45-year-old Emirati man in a white kandura stands pouring Arabic coffee from a brass dallah for a 28-year-old Emirati man in a navy overshirt, who receives the small cup with his right hand. Hospitality, trust, the start of a conversation. Deep navy shadows, warm gold highlights, 35 mm, f/2.8, natural textures, subtle grain, no text or logos.

### `ideas-browse.webp`: 1536×1024 (3:2), Ideas page hero
> Close over-the-shoulder shot of a man in a white kandura sleeve scrolling a directory of idea cards on a laptop screen facing the camera: an abstract dark-navy grid of cards with small cyan and gold category tags and lock icons, nothing readable. Warm walnut desk, small cup of Arabic coffee, steel pen, soft arabesque shadow, out-of-focus evening city lights. Deep navy shadows, warm tungsten light, cyan screen glow, 50 mm, f/2.2, subtle grain, no text or logos.

### `contact-desk.webp`: 1536×1024 (3:2), Contact page
> Calm evening still life with a person: a 28-year-old Emirati man in a navy overshirt, seen from the side at a warm oak desk, writing an email on a laptop angled toward camera that shows an abstract dark-navy message form with a cyan send button, nothing readable. A notebook with blank pages, a phone face-down, a small olive plant, warm lamp light, soft city lights through the window. Unhurried, approachable mood. Deep navy shadows, warm gold highlights, 50 mm, f/2.4, natural texture, subtle grain, no text or logos.

---

## 6. Export checklist

- `.webp`, quality 82, at the exact sizes above (upscale in the generator first if needed, then resize down).
- Check every screen, cup and notebook for stray text or logos and the hands for extra fingers; regenerate rather than retouch if the face drifts from the cast bible.
- Video: H.264 `.mp4` (CRF 23, about 2 MB) plus VP9 `.webm` (about 1 MB), no audio track, first and last frame identical.
check all the pages till 320px and make also check fro RTL aand also langaues in all the pages it proelry changeing or not 