# OpenPyStruct: working rules

## Icons are code

The icon set under `grasshopper/icons/` is generated. **Edit the `def()` in `icons/src/ops-vec-set.js`
(or a motif in `ops-vec.js`), then run `node emit.js`.** It writes, in one pass, `svg/`, `png24/`,
`OpenPyStruct_Icons_Vector.svg`, `manifest.csv` and the logo files in `package/`, so they cannot drift.

- Never hand-draw an SVG, hand-place a PNG, or resize one with ImageMagick, System.Drawing or an online
  tool. If Chromium or Pillow is missing, fix the environment (`OPENPYSTRUCT_CHROME`,
  `OPENPYSTRUCT_PYTHON`); do not route around the pipeline. Without them only vectors are written.
- The drawing rules (24-unit box, two stroke weights, hue means physics) are in `grasshopper/icons/README.md`.
  The engine's safe-area guard fails the run instead of cropping; shrink the motif, do not bypass it.
- A glyph's file name is its wiring: it must equal the component's display Name after the transform in
  `OpenPyStruct.GH/Icons.cs`. A miss is silent (Grasshopper draws its default box).
- The logo is code too: `icons/src/logo.js` draws it (a meshed fish-belly girder under load, 128 units),
  and `node emit.js --package` (or a full run) writes `icons/package/OpenPyStruct_Logo.svg`, the 128px Yak
  icon `OpenPyStruct.png` and the 512px org avatar `OpenPyStruct_Avatar.png`. Edit `logo.js`, never the
  outputs, and never resize a `png24/` glyph to make a bigger icon.
- The engine and exporter are Eddy3D's (GPL-3.0-or-later). Keep the provenance headers.

`dotnet test grasshopper/OpenPyStruct.Core.Tests` guards this (`TestIconCoverage`, `TestIconPolicy`):
every component has a glyph, svg/png24/manifest.csv list the same names, and the package icon is 128x128
RGBA and named in `manifest.yml` and `yak-release.yml`. CI does not re-run `emit.js`; regenerate locally
and commit the outputs with the source change.

## Releasing

Tag `vX.Y.Z` (or `-beta.N`); `yak-release.yml` builds, pushes to Yak and creates the GitHub release.
Yak versions cannot be re-published, so only tag when the package is meant to ship. `YAK_TOKEN` is a
repository secret; never paste it into chat or commit it.

A `dotnet build` here rewrites the user's Grasshopper `OpenPyStruct.ghlink` to the build folder; restore it
if you build from a worktree.
