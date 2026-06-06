# Riichi calculator (standalone)

A standalone Blazor WASM app that hosts the Riichi mahjong scoring calculator. The calculator
component (`RiichiScoreCalculator`) and its scoring logic (`RiichiScore`) live in **`Tsump.Shared`**,
the shared library in the [MahjongIndeler](https://github.com/Steffens-Bridgemate/MahjongIndeler)
repo — the same component used by the organizer and scoring apps. This repo only adds the thin host.

## Local development

`Tsump.Shared` is consumed as a git submodule at `external/MahjongIndeler`. The project file falls
back to the sibling working copy (`..\..\MahjongIndeler\Tsump.Shared`) when the submodule isn't
present, so if you have the MahjongIndeler repo checked out next to this one you can build/run
immediately:

```powershell
dotnet run --project RiichiCalc/RiichiCalc.csproj
```

## First-time repo setup (once a remote exists)

```powershell
git init
git add .
git commit -m "Initial standalone Riichi calculator"
git submodule add https://github.com/Steffens-Bridgemate/MahjongIndeler.git external/MahjongIndeler
git commit -am "Add Tsump.Shared submodule"
# create the GitHub repo, then:
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin master
```

Then in **Settings → Pages**, set the source to **GitHub Actions**.

## Deploy

`.github/workflows/deploy.yml` publishes on push to `master`/`main` and deploys to GitHub Pages.
**Edit the `sed` base-href line** in that workflow to match the repo name you create
(it defaults to `/MahjongRiichiCalc/`).

## Updating the shared component

When `Tsump.Shared` changes upstream, bump the submodule:

```powershell
git submodule update --remote external/MahjongIndeler
git commit -am "Bump Tsump.Shared"
git push
```
