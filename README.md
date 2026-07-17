# n8n-nodes-mailvalid

This is an n8n community node for [MailValid](https://mailvalid.io) — an email verification API with real-time and bulk verification: syntax validation, DNS/MX lookup, live SMTP mailbox checks, plus disposable-domain, role-account, free-provider, and catch-all detection.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation:

**Settings → Community Nodes → Install** and enter:

```
n8n-nodes-mailvalid
```

## Credentials

1. Sign up at [mailvalid.io/register](https://mailvalid.io/register) — new accounts get **100 free credits**.
2. Create an API key at [mailvalid.io/dashboard/api-keys](https://mailvalid.io/dashboard/api-keys).
3. In n8n, create a **MailValid API** credential and paste the key. The credential test checks your key against the credit-balance endpoint.

## Operations

| Operation | Description | Cost |
|---|---|---|
| **Verify Email** | Verify a single address in real time. Returns `status` (`valid` / `invalid` / `catch_all` / `unknown` / `do_not_mail`), `is_disposable`, `is_role_based`, `confidence_score` (0–100), `status_reason`, and more. | 1 credit per fresh billable result (`unknown` and cached results are free) |
| **Submit Bulk Job** | Queue a list of emails for asynchronous verification. Accepts comma/newline-separated addresses and an optional completion webhook URL. | 1 credit per fresh completed result |
| **Get Bulk Job** | Poll a bulk job's status and fetch its results. | Free |
| **Get Credit Balance** | Get your remaining credits and lifetime usage. | Free |

## Example: clean signups before they hit your CRM

1. **Trigger:** New row in Google Sheets (or Typeform submission, webhook, …)
2. **MailValid → Verify Email** on the address
3. **IF node:** `{{$json.result.is_valid}}` is true **and** `{{$json.result.is_disposable}}` is false
4. **True branch:** add to your CRM / mailing list. **False branch:** discard or flag for review.

## Compatibility

Requires n8n version 1.0 or above. Tested against the current MailValid API (`https://mailvalid.io/api/v1`).

## Resources

- [MailValid API documentation](https://mailvalid.io/docs)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE)
