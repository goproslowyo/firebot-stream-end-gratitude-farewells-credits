# Releasing

This project follows [Semantic Versioning](https://semver.org) (`MAJOR.MINOR.PATCH`). A release is
published automatically by GitHub Actions when you push a **`v*` tag** — the
[`release` workflow](../.github/workflows/release.yml) builds the bundle and attaches both
`firebot-stream-end-credits.js` and `stream-end-sequence.firebotsetup` to the GitHub Release.

## Cut a release

1. **Bump the version** in the two places that must stay in sync:
   - `package.json` → `"version"`
   - `src/main.ts` → `MANIFEST.version` (this is what Firebot shows)

   *(For the very first release, v0.1.0, both are already `0.1.0` — no bump needed.)*

2. **Update `CHANGELOG.md`**: move the `[Unreleased]` items under a new
   `## [X.Y.Z] - YYYY-MM-DD` heading, and add the matching link references at the bottom.

3. **Commit, tag, push:**

   ```bash
   git commit -am "release: vX.Y.Z"
   git tag vX.Y.Z
   git push origin main --tags
   ```

4. The release workflow runs on the tag and publishes the release with both artifacts. Release notes
   are auto-generated from the commits since the previous tag.

## Notes

- The `version` inside `stream-end-sequence.firebotsetup` is Firebot's **setup-format** version, not
  this project's version — leave it alone.
- Commit messages use conventional prefixes (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`) so the
  auto-generated release notes read cleanly.
- The CI workflow (`ci.yml`) runs typecheck, tests, lint, and build on every PR and push to `main`.
