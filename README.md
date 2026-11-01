# Cozy Styles

Style packs for [Cozy Studio](https://github.com/gvastethecreator/cozy-studio), the free image studio that runs on your own machine. Each pack holds ready-made styles (a look you add to any prompt) with sample cards, so you can see a style before you use it.

**[Browse every style →](https://gvastethecreator.github.io/cozy-styles/styles/)** · [Home](https://gvastethecreator.github.io/cozy-styles/)

## Packs

| Pack            | Styles | What it covers                                                                                                     |
| --------------- | -----: | ------------------------------------------------------------------------------------------------------------------ |
| Essentials      |    100 | A starter set picked from every pack: photography, painting, illustration, anime, 3D, fantasy, games and design.   |
| Print Registers |     21 | Printmaking studies: plate marks, ink transfer, registration and printed tone.                                     |
| Paper & Pigment |     23 | Paper and pigment studies: surface behavior, layering and visible marks.                                           |

More packs will follow here as they are finished.

## Install

You do not need to download anything from this page.

1. Start Cozy Studio. Essentials installs by itself on first start.
2. Open **Settings → Styles & workflows**. Under **Get more packs**, open a pack to see its cover and sample styles.
3. Select **Install**. Tick **Full-quality cards** if you also want the large sample cards; otherwise Studio downloads small thumbnails only.
4. Reload Studio. The new styles show in **Create → Catalog**.

Studio checks the SHA-256 of every download before it replaces an installed pack. When a pack here gets a new version, the same screen offers the update; an update keeps the full cards you already installed.

An AI agent connected to Studio's `cozy-studio-mcp` server can do the same with `studio_available_extensions` and `studio_install_extension`. See [Agent tools](https://github.com/gvastethecreator/cozy-studio/blob/main/docs/agents/mcp.md).

## What is in this repository

- `index.json`: the released packs, each with its version, archive names, SHA-256 and size. Studio reads this file.
- `packs/<id>/extension.json`: a readable copy of each released pack's manifest.
- [Releases](https://github.com/gvastethecreator/cozy-styles/releases): one release per pack version, with three archives: the pack, its full-quality `cards` layer and a small preview.
- The `gh-pages` branch: the home page and the style browser linked above.

Release tooling writes these files. Please do not open pull requests that edit them by hand. For a broken style, a wrong description or a pack request, open an [issue in Cozy Studio](https://github.com/gvastethecreator/cozy-studio/issues).

The extension format is described in [ADR 0011](https://github.com/gvastethecreator/cozy-studio/blob/main/docs/adr/0011-declarative-extensions-and-style-pack-sources.md).
