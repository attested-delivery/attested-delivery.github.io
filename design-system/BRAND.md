# attested-delivery — Brand Guidelines

The brand exists to make one promise legible: **the thing you verified is the
thing that runs.** Everything here — the name, the voice, the verified-green
accent against a near-black field — serves that promise.

## Name rationale

**attested-delivery** is two plain words doing exact work.

- **Attested** — every claim about a release (how it was built, what it
  contains, that it passed its gates) is a signed statement bound to a content
  digest, recorded in a transparency log, and re-checkable by anyone. Not
  "trusted." _Attested._ Trust is a feeling; an attestation is evidence.
- **Delivery** — the scope is the whole path from commit to admission, not just
  the build. A release that verifies in CI but is rebuilt on the way to
  production has delivered nothing you can stand behind. The name claims the
  entire pipeline.

The hyphenated, lowercase, monospace styling is deliberate: it reads like a
command you would type, not a logo you would frame. The brand is infrastructure,
not a mascot.

**Always write it** lowercase as `attested-delivery`, even at the start of a
sentence where layout allows. Never "Attested Delivery," "AttestedDelivery," or
"A-D."

## The promise in one line

> The digest is the release. Everything true about it travels with it.

## Voice & tone — writing for a security-anxious audience

The reader arrived because something in the supply chain scared them: a scanner
that turned into a credential thief, a tag that got force-pushed, a signature
that verifies a digest which never reached production. Write to a competent
engineer who is tired of abstractions and does not want to be sold to.

### Principles

1. **Name the threat plainly, then defuse it.** Lead with the concrete failure
   (CVE-2026-33634: 76 of 77 `trivy-action` tags force-pushed to malicious
   commits), then the specific defense (pin actions by commit SHA). Fear without
   a fix is just more anxiety; we always pair them.
2. **Evidence over adjectives.** Prefer "re-verifies independently from a
   workstation" to "enterprise-grade security." If a claim cannot be checked, it
   does not belong in the copy.
3. **Calm, not breathless.** The climate is hostile; the voice is not. Short,
   declarative sentences. No exclamation marks. No "game-changing," "bulletproof,"
   "military-grade," or "100% secure" — security people distrust those words on
   sight, correctly.
4. **Precise nouns.** digest, provenance, attestation, SLSA L3, OIDC, Rekor,
   admission. Use the real terms; link them to a definition the first time. Never
   dumb them down into "magic."
5. **Honest about cost.** Pinning by digest makes upgrades a deliberate,
   reviewed step. We say so, and call it the feature, not hide it.

### Do

- "A tag is a label, not an identity. Pin to the digest."
- "Fail closed: an unverifiable artifact does not deploy."
- "You can check this yourself. Here is the command."

### Don't

- "Total peace of mind." / "Set it and forget it." / "Unhackable."
- Vague urgency ("In today's threat landscape…") with no concrete hazard.
- Promising the tooling removes all risk. It removes _specific, named_ risks.

## Logo usage

The mark is a **hexagonal seal** — the content digest — with a verification
check struck through its center. One notch on the lower-left edge is broken and
rendered in threat-red: the seal is defined by the threat it holds closed.

**Clear space.** Keep padding of at least the height of the hexagon mark on all
sides. Never crowd the wordmark.

**Minimum size.** Do not render the full lockup below 120px wide. Below that,
use the hexagon mark alone (it remains legible to ~24px).

**Color.**

- Default: verified-green mark (`#36D399`) with the threat notch in
  `#FF5C6C`, wordmark `attested` in `#E8EEF6` and `delivery` in `#36D399`,
  on a dark background (`#0A0D13`–`#151B27`).
- One-color reversed: entire lockup in `#E8EEF6` on dark, or `#0A0D13` on
  the accent green, when a single ink is required.

### Logo don'ts

- Don't recolor the mark to a non-brand hue or add a second accent.
- Don't apply gradients, bevels, drop shadows, or outlines to the mark.
- Don't rotate, stretch, or condense it.
- Don't place the default mark on a light or low-contrast background — the brand
  lives on dark. If you must go on light, use the one-color `#0A0D13` lockup.
- Don't remove or "fix" the broken notch. It is load-bearing meaning, not a
  defect.

## Color, type & spacing

All visual values are defined once in [`tokens.json`](./tokens.json) and consumed
by the marketing site as CSS custom properties — no hand-copied hex codes. See
[`../README.md`](../README.md) for how the site loads them.

- **Accent discipline.** Verified-green is the _only_ brand accent. Threat-red
  and caution-amber are semantic state colors (danger, warning) used sparingly —
  never decoratively, never as a second brand color.
- **Type.** System sans for prose, monospace for the wordmark, code, digests,
  and any value the reader could copy and run. The monospace signals "this is
  real, you can paste it."
- **Spacing.** A 4px base unit; generous vertical rhythm. The layout should feel
  unhurried — the opposite of alarm.
