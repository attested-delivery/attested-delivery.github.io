# Security

This site is itself an **attested use case** of the attested-delivery posture:
the same supply-chain rigor the org preaches is applied to the site you are
reading. The CI pipeline is fail-closed — an artifact that cannot be verified
does not deploy.

## What the pipeline guarantees

- **SHA-pinned actions, enforced.** Every `uses:` is pinned to a full 40-char
  commit SHA. The central `attested-delivery/.github` **`pin-check`** reusable
  runs on every push and pull request and fails closed on any tag/branch ref.
- **Merge-time quality gates** (`.github/workflows/quality-gates.yml`), wired as
  a thin caller of the org's central reusables: **SAST** (CodeQL,
  `reusable-sast-codeql.yml`) and **SCA** (OSV-Scanner + dependency review,
  `reusable-sca-osv.yml`). Findings converge on the repository's code-scanning
  Security tab.
- **Attested deploy** (`.github/workflows/deploy.yml`): the published Pages
  artifact carries a **SLSA build provenance** attestation and a **CycloneDX
  SBOM** attestation, both keyless (Sigstore, via the run's OIDC `id-token`) and
  bound to the artifact's `sha256` digest. A dedicated `verify` job re-checks
  both **before** the deploy job is allowed to run.

> Two gates are deliberately not wired yet: Trivy (container/IaC/license) and
> OpenSSF Scorecard. Their actions (`aquasecurity/trivy-action`,
> `ossf/scorecard-action`) are not yet on the org Actions allow-list, so calling
> them would startup-fail. They land once allow-listed.

## Verify it yourself

You do not need this repo's permissions or secrets to check its work. From any
workstation with the [GitHub CLI](https://cli.github.com/) authenticated:

```bash
# 1 · grab the exact artifact CI published (the Pages tarball)
RUN_ID=$(gh run list --repo attested-delivery/attested-delivery.github.io \
  --workflow "Deploy site to GitHub Pages" --status success \
  --limit 1 --json databaseId --jq '.[0].databaseId')
gh run download "$RUN_ID" --repo attested-delivery/attested-delivery.github.io \
  --name github-pages --dir ./_verify

# 2 · verify SLSA build provenance (bound to the artifact digest)
gh attestation verify ./_verify/artifact.tar \
  --repo attested-delivery/attested-delivery.github.io \
  --predicate-type https://slsa.dev/provenance/v1

# 3 · verify the CycloneDX SBOM attestation
gh attestation verify ./_verify/artifact.tar \
  --repo attested-delivery/attested-delivery.github.io \
  --predicate-type https://cyclonedx.org/bom
```

Each command exits non-zero on any failure. The provenance and SBOM are signed
by this repository's deploy workflow (the SLSA L3 build identity), so `--repo`
is sufficient; inspect the predicate body to read the recorded claim:

```bash
gh attestation verify ./_verify/artifact.tar \
  --repo attested-delivery/attested-delivery.github.io \
  --predicate-type https://cyclonedx.org/bom --format json \
  | jq '.[0].verificationResult.statement.predicate | keys'
```

A successful verification proves the attestation is authentic and bound to the
artifact. A signed attestation records that a gate **ran and produced a
verdict** — read the predicate body for the verdict itself.

## Reporting a vulnerability

Open a private security advisory via the **Security → Advisories** tab on the
repository, or start a thread in the org's
[discussions](https://github.com/orgs/attested-delivery/discussions). Please do
not file public issues for undisclosed vulnerabilities.
