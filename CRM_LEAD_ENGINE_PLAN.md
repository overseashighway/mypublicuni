# OH Education Lead Engine — Multi-site CRM integration blueprint
Status: PREVIEW / FRONTEND ENQUIRY PREPARATION ONLY, NOT AN ACTIVE CRM OR DATA-COLLECTION BACKEND.

## Vision
One central Overseas Highway CRM supporting 50+ education websites, subdomains, campaigns and agent sources. Each site uses one secure POST endpoint on an OH-controlled API domain, never writes directly to Supabase with privileged service keys.

## Recommended public API contract
POST /v1/leads — TLS only, strict CORS per approved origins, per-IP throttling, server-side validation, bot protection, API authorization/rate limits. The frontend must send:
{
  "site_id": "mypublicuni",
  "origin_domain": "mypublicuni.overseashighwaystudy.com",
  "landing_path": "/university/utm.html",
  "source": "google|facebook|organic|referral|qr|agent|other",
  "utm_source": "",
  "utm_medium": "",
  "utm_campaign": "",
  "utm_content": "",
  "subject": "",
  "university": "",
  "study_level": "",
  "intake": "",
  "student_name": "",
  "country": "",
  "email": "",
  "phone": "",
  "enquiry_consent_at": "ISO8601",
  "marketing_opt_in": false,
  "privacy_notice_version": "v1"
}
Server generates lead_id, timestamp, normalized phone/email, attribution and duplicate match. Never trust a client-created lead_id. Consent to responding and separate marketing opt-in must be independently recorded. Add clear privacy notice and opt-out.

## CRM data model
sites (id, domain, category, active)
leads (id, site_id, name, email, phone, country, study_level, intake, subject, university, consent_at, marketing_opt_in, status, created_at)
touchpoints (lead_id, site_id, landing_path, campaign, medium, source, occurred_at)
activities (lead_id, owner_id, channel, note, next_follow_up_at)
applications (lead_id, university, programme, intake, submission_status, outcome)
campaigns (id, platform, name, spend, source_tags)
users + permissions (role, office_id, permitted_sites, granted_by)
audit_log (action, user_id, lead_id, occurred_at)
Do not duplicate PII into client analytics or send raw contact details to ad pixels.

## CRM funnel
New enquiry → Uncontacted → Contacted → Profile assessed → University shortlisted → Documents pending → Application started → Submitted → Offer received → Visa processing → Enrolled / Lost.
Assign counsellor/office; SLA on first response; deduplicate across sites; consent-aware re-engagement.
Reports by website, subject, university, intake, market, campaign, source, assigned counsellor, cost per lead, qualified lead, application, enrollment. Include deduplication and cohort filtering.

## Current website status
Homepage January 2027 CTA → #oh-lead-capture. Lead form prepares email in the student's email app; form data is NOT automatically uploaded or saved. University profile enquiry CTAs route through tracked homepage form. No CRM or automated marketing is active. January 2027 availability is not claimed for all universities.
Replace this flow only after a production API, verified official inbox, privacy notice, consent records and testing are in place.

## Safety and privacy
Follow Malaysia PDPA (Act 709) and amendments, privacy notices, withdrawal procedures, retention/deletion policy, role-based access, encryption, incident response, consent records, and cross-border rules where relevant. Minors/parent enquiries require special handling.
