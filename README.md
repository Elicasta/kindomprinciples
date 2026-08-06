# Kingdom Principles

A live teaching and presentation system for the **Kingdom Principles** series.

## Current lesson

**Lesson 1: The Principle of Identity**  
Identity must be settled before pressure comes.

Primary passages include Matthew 3:13-17, Matthew 4:1-11, Psalm 139:13-18, Romans 8:14-17, Proverbs 29:25, and Colossians 3:3.

## Included outputs

- Main projector
- Scripture display
- OBS lower thirds
- OBS full slides
- Confidence monitor
- Presenter control surface
- Mobile controller
- Audience polls
- Workbook questionnaire

## Deployment

Vercel runs `python3 scripts/apply-kingdom-principles.py` during each build. The migration safely wires `kingdom-principles.js` into the existing presentation engine while keeping the stable projector and synchronization code intact.

## Routes

- `/projector`
- `/scriptures`
- `/obslowerthirds`
- `/obsslides`
- `/confidence`

## Design system

- Deep Navy: `#071521`
- Midnight Blue: `#0D2232`
- Charcoal Black: `#101417`
- Warm Gold: `#D6A63B`
- Muted Gold: `#B8872E`
- Ivory White: `#E8E3D9`
- Soft Gray: `#A7A9A6`
- Warm Highlight: `#F2D48A`

Fonts: Bebas Neue, Montserrat, and EB Garamond.
