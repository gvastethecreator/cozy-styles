# cozy-styles

Public style packs for Cozy Studio, published as Cozy Extensions.

## What lives here

- `index.json`: the list of released extensions, each with its version, archive name, sha256 and size.
- `packs/`: readable manifests of released packs.
- GitHub releases: one zip archive per extension, with its data and card images.

This repository is generated. Style work happens in a private workspace and is published here by the promote command. Do not edit files here by hand.

## Use in Cozy Studio

Cozy Studio reads this repository as its default Extension Source. It downloads an extension from the release assets, checks its sha256 and installs it atomically.

See ADR 0011 in the Cozy Studio repository for the extension format.
