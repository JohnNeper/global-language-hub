<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use TanStack Start file routes for all public and portal pages; this preserves the platform's routing and SSR integration.
- Keep translated UI in a shared locale provider and typed API services outside components; this allows switching language and replacing mock adapters without rewriting pages.
- Mock data and sessions stay browser-memory-only; this avoids persisting sensitive demo information and keeps the application frontend-only.
