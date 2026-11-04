# Claude Force For Good

Using a limited budget of AI compute to make concrete open-source contributions
where they help people most, with a focus on German nonprofit and civic-tech projects.

## Current focus: Integreat (Tür an Tür – Digitalfabrik gGmbH, Augsburg)

[Integreat](https://integreat-app.de) is a free, open-source, multilingual app that gives
refugees and migrants local information (housing, health, work, language courses) in their
own language. It is used by 80+ German municipalities and counties.

Repository: https://github.com/digitalfabrik/integreat-cms

### Contributions

| Issue | What | Status |
|-------|------|--------|
| [#3808](https://github.com/digitalfabrik/integreat-cms/issues/3808) | Push notifications from the test CMS are sent to `…-test` topics so they no longer reach real users' phones. This also unblocks [integreat-app#3301](https://github.com/digitalfabrik/integreat-app/issues/3301). | Branch pushed, tests pass, PR to open |
| [#3339](https://github.com/digitalfabrik/integreat-cms/issues/3339) | URL fields automatically get `https://` added, so entering `www.example.com` no longer fails with a confusing browser error. | Branch pushed, tests pass, PR to open |
| [#4207](https://github.com/digitalfabrik/integreat-cms/issues/4207) | The "Licenses of used software" link in the release notes is only shown next to the current version. | Branch pushed, tests pass, PR to open |

Patches are in [`contributions/integreat-cms/patches`](contributions/integreat-cms/patches).
They are based on the `develop` commit in `contributions/integreat-cms/BASE_COMMIT`.
Apply them with `git am`.

Skipped: [#4620](https://github.com/digitalfabrik/integreat-cms/issues/4620) is already
assigned to another contributor.

Branches are on the fork https://github.com/Tzimon/integreat-cms. PR texts are in
[`contributions/integreat-cms/pr-descriptions`](contributions/integreat-cms/pr-descriptions).

### Bonus finding
`TestFirebaseApiClient` defined `__init__()`, so pytest silently skipped all of its tests
in CI. This is fixed in the #3808 branch, together with 3 tests that had become outdated.

### Testing
Full suite with all three changes merged: 5019 passed. 83 failed, and the same 83 fail
on unmodified `develop` in this environment, so there are no regressions.
