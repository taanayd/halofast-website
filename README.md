# HaloFast — Coming-soon website

A responsive React + Vite landing page for **HaloFast**, the offline-first intermittent-fasting companion. Designed for GitHub Pages and the custom domain `halofast.app`.

## What's included

- Dark navy and orange HaloFast brand styling with the updated open-halo mark
- Sora typeface and responsive mobile layout
- Responsive hero with a CSS/SVG timer illustration
- Feature sections for offline-first timing, hydration, food tracking, history, and transparent pricing principles
- Email launch-waitlist form UI
- SEO metadata and a 1200×630 Open Graph/Twitter preview image
- A standalone launch-waitlist privacy notice at `/privacy.html`
- Custom favicon and `public/CNAME`
- GitHub Actions workflow to build and deploy to GitHub Pages
- Reduced-motion and accessible form states

## Waitlist configuration

The waitlist form is deliberately not presented as working until you configure a submission provider. This avoids telling visitors they joined when no email was stored.

1. Create a form with a provider such as [Formspree](https://formspree.io/).
2. Copy its endpoint URL (for example, `https://formspree.io/f/your-form-id`).
3. In your GitHub repository, open **Settings → Secrets and variables → Actions → Variables → New repository variable**.
4. Name it `VITE_FORMSPREE_ENDPOINT` and set its value to your form endpoint.
5. The included `.github/workflows/deploy.yml` already passes this variable into the Vite production build.
6. Commit and push. Test the form with an address you control and confirm the submission appears in your form provider.

The live waitlist uses Formspree form `xyekbyeg`; its workflow sends a notification to `halofastapp@outlook.com` and archives submissions. The public privacy contact is also `halofastapp@outlook.com`. Review the provider's processing terms and keep the privacy notice aligned with the actual setup. This policy is a starter template, not legal advice.

`VITE_` variables are included in client-side build output, so use only a public form endpoint here. Never put private API keys or secrets in a Vite environment variable.

## Run locally

You need Node.js 20 or newer and Git.

```bash
npm install
npm run dev
```

Vite prints a local URL, usually `http://localhost:5173`.

Build and preview the production site:

```bash
npm run build
npm run preview
```

## Publish to GitHub Pages

### 1. Create a repository

Create a GitHub repository, for example `halofast-website`. Push this project to the `main` branch:

```bash
git init
git add .
git commit -m "Build HaloFast coming-soon website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/halofast-website.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. If the repository already exists and has a README, clone it first or reconcile the existing files before pushing.

### 2. Enable GitHub Pages with Actions

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Go to the **Actions** tab and confirm the **Deploy HaloFast to GitHub Pages** workflow completes successfully.
5. The workflow builds the Vite app and publishes the `dist/` folder. Do not select a branch `/docs` folder as the publishing source.

The Vite `base` is `/` because this site is served from a custom domain at the domain root.

### 3. Add the custom domain in GitHub first

1. In the repository, go to **Settings → Pages**.
2. In **Custom domain**, enter `halofast.app` and click **Save**.
3. The `public/CNAME` file is also included in this project. With a custom Actions workflow, GitHub says a generated CNAME file is not required, but keeping this source file documents the intended domain.

### 4. Configure DNS at the company where you bought the domain

In the domain's DNS management page, create the following apex/root records. If these records already exist, edit them rather than adding duplicates.

| Type | Host / Name | Value | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | Default |
| A | `@` | `185.199.109.153` | Default |
| A | `@` | `185.199.110.153` | Default |
| A | `@` | `185.199.111.153` | Default |
| CNAME | `www` | `YOUR-USERNAME.github.io` | Default |

Replace `YOUR-USERNAME.github.io` with your GitHub Pages account domain (not the repository URL and not `/halofast-website`). Some DNS providers use `@` to mean the root domain; follow the provider's UI if it uses a different label.

If your DNS provider has old conflicting A/AAAA/CNAME records for `@` or `www`, remove the conflicting ones. Do not delete unrelated MX/TXT records used for email or domain verification. GitHub also publishes IPv6 AAAA records; see the official docs linked below if you want to configure them.

### 5. Wait for DNS and enable HTTPS

1. DNS changes may take up to 24 hours to propagate.
2. Return to **Settings → Pages**. Wait until GitHub verifies the custom domain and provisions the certificate.
3. Enable **Enforce HTTPS** when the checkbox becomes available.
4. Test both `https://halofast.app` and `https://www.halofast.app`.

For stronger domain security, verify ownership of the domain in your GitHub account settings before configuring it on the repository. Keep the domain configured only for the intended Pages site.

## Privacy page and social profiles

- The privacy notice is published at `https://halofast.app/privacy.html` after deployment.
- The privacy contact is `halofastapp@outlook.com`. This address is visible to all site visitors. The waitlist is configured with Formspree; review its processing terms and applicable data-handling requirements.
- The footer links are set to `@halofastapp` on X and Instagram and a `halofastapp` LinkedIn company page. Confirm those URLs belong to you before publishing; edit the anchors in `src/main.jsx` if needed.
- The Open Graph preview image is `public/og-image.png` (1200×630). The page metadata points to `https://halofast.app/og-image.png`.

## Update the website

Edit files in `src/`, commit, and push to `main`. GitHub Actions automatically rebuilds and deploys.

```bash
git add .
git commit -m "Update HaloFast landing page"
git push
```

## Customize before launch

- Update social links once HaloFast's official social profiles exist.
- The waitlist currently sends submissions to Formspree and notification emails to the configured Outlook address. Confirm provider settings and applicable data-handling requirements before promoting it widely.
- A template is not a guarantee of legal compliance.
- Verify that the social-profile URLs in `src/main.jsx` are the official HaloFast accounts; replace any that are not active.
- Confirm product commitments and feature plans before treating them as final public promises.
- Keep the launch date unspecified until it is confirmed.

## Official deployment references

- [Vite: Deploying a Static Site / GitHub Pages](https://vite.dev/guide/static-deploy.html)
- [GitHub Pages: Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages: Securing your site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

## License

Choose and add a license before making the repository public if you want to specify how others may reuse the code.
