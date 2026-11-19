# Future improvements

Record only simplifications or improvements that are actually left outside this delivery's scope.

## Design decisions

- `DESIGN.md` does not specify a focus-ring treatment; the interface uses the guide's blue link color for a visible focus ring.
- Form control height and dialog dimensions are not specified; the form uses 48px controls and a dialog capped at 650px for consistency with the guide's spacing and layout scale.
- The modal backdrop is derived from the guide's ink color with transparency because no overlay color is defined.

## Out of scope

- Authentication, user accounts, and role-based access are intentionally omitted; the delivered interface is a shared task board and the API has no token or session requirement. A fixed frontend token was discarded: any value bundled by Vite is readable in the browser and would only give a false sense of security. A real implementation would use Laravel Sanctum (personal access tokens or SPA cookies), a seeded demo user, and policies so each assignee only edits their own tasks.
- Rate limiting is not configured: no route uses the `throttle` middleware. Real deployments should add `throttle` per user and route once authentication exists.
- Task deletion is not exposed because it is not part of the specified API contract.
- Queues, caching, and soft deletes are excluded to keep the technical-test implementation small and synchronous.
