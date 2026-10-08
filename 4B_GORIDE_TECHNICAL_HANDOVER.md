# 4B (GoRide) Technical Handover & Developer Specifications
**Document Date:** 2026-09-11
**Source:** Software Development Team Consolidated Handover (Document 1 Complete) & Telecom Egypt (WE) Hosting RFP

---

## 1. Executive Summary & Stack Verification
- **Internal System Codename:** GoRide (Custom Passenger Ride-Hailing Platform for 4B)
- **Primary Domain:** `admin.4b.com.eg` (was referenced as `admin.goride.eg`)
- **Backend Architecture:** Node.js 22 LTS, NestJS (10.x / 11), Prisma ORM (22 migrations incl PostGIS), Socket.IO with Redis Adapter, BullMQ (21 queues).
- **Admin Panel & Web:** Next.js 14+ (SSR, runtime Node on port 3001), Tailwind CSS, IBM Plex Sans Arabic / Tajawal fonts.
- **Database:** PostgreSQL 16 + PostGIS 3.4 (Strict requirement for geospatial radar, nearby captain search, ride zones).
- **Cache & Message Broker:** Redis 7 (persistence ON, maxmemory-policy `noeviction`).
- **Media & Document Storage:** Cloudinary (Signed private authenticated delivery with HMAC `?exp=&sig=`). Zero local media storage.
- **OTP & Communications:** Twilio A2P SMS with Egyptian Alphanumeric Sender ID ("4B"), plus WhatsApp Cloud API adapter.
- **Payments & Payouts:** Fawry (Acceptance charge + Disbursement captain payouts). Webhook at `/api/v1/webhooks/fawry`.
- **Identity & Biometric KYC:** Face-match comparison (Captain live selfie vs ID card). Self-hosted **CompreFace** (Docker ~2GB RAM on Egyptian soil to comply with Data Protection Law 151/2018).
- **Mapping & Geocoding:** Google Maps Platform (Maps SDK Android, Maps SDK iOS, Maps JS API, Places API, Geocoding, Directions, Distance Matrix).

---

## 2. Distinction: 4B vs Other App (WiKaLa)
The developer handover explicitly resolved a previous confusion:
- **Other App (WiKaLa / Agency):** Uses MongoDB, Agora (VoIP Calling), OpenAI Moderation, Paymob/Stripe, Generic SMS Aggregator, Google Cloud Vision.
- **4B Passenger:** Uses PostgreSQL + PostGIS, NO Agora VoIP, NO OpenAI moderation, Fawry (not Paymob), Twilio OTP, Face-match KYC (CompreFace), Self-hosted RS256 JWT + argon2id auth.

---

## 3. Server Runtime & Process Breakdown
Running on Ubuntu 22.04 / 24.04 LTS (x86_64, glibc, full-ICU for `ar-EG` dates):

| Process | Production Command | Port | Critical Function |
|---------|-------------------|------|-------------------|
| **API** | `PROCESS_ROLE=api node dist/src/main` | 3000 | Core REST API, WebSockets `/socket.io`, Ride dispatching |
| **Worker** | `PROCESS_ROLE=worker node dist/src/worker` | — | Background BullMQ jobs, OTP delivery, Fawry payout reconciliation, Cron |
| **Admin Panel** | `next start -p 3001` | 3001 | Operations dashboard at `admin.4b.com.eg` |

---

## 4. Telecom Egypt (WE) Hosting Specifications (Quotation Pending)
Submitted to Telecom Egypt (WE) for official pricing (reply expected in 1-2 days):

### A. Virtual Machines (Linux VMs)
1. **`4B-App-Server`**:
   - Function: API, Worker, Admin Panel
   - CPU: 4 vCPU | RAM: 8 GB | Disk: 40 GB SSD | OS: Ubuntu 22.04/24.04 LTS
2. **`4B-DB-Server`**:
   - Function: Primary Database
   - CPU: 4 vCPU | RAM: 8 GB | Disk: 100 GB SSD | DB: PostgreSQL 16 + PostGIS 3.4
3. **`4B-Cache-Server`**:
   - Function: Live Coordinates, Queues, Rate Limiting
   - CPU: 2 vCPU | RAM: 2 GB | Disk: 20 GB SSD | DB: Redis 7 (`noeviction`)

### B. Network & Security (F5 Load Balancer & WAF - `4B-VS`)
- **VIP Service Port:** 443 (HTTPS)
- **Target Node Ports:** 3001 (Admin) & 3000 (API/WebSocket)
- **Estimated Concurrent Sessions:** 1,000
- **WebSocket Upgrade:** `/socket.io` with `proxy_read_timeout >= 600s`
- **Reverse Proxy Header:** `X-Forwarded-For` with `TRUST_PROXY_HOPS=1`
- **Health Check Path:** `/health`
- **Upload Limit:** 5 MiB
- **WAF Sensitive Parameters:** `password`, `SEED_ADMIN_PASSWORD`
- **Bandwidth:** 20 Mbps (Internet / MPLS VPN)
- **Remote Access:** 7 SSL VPN developer/admin accounts

### C. Backup & Disaster Recovery Policy
- **`4B-DB-Server` (pg_dump):**
  - Initial: 50 GB | Monthly Growth: 120 GB | Expected: 1,500 GB (1.5 TB)
  - Policy: Weekly Full, Daily Incremental (كل ليلة)
  - Retention: 180 days (6 months)
- **`4B-Cache-Server` (Redis AOF):**
  - Initial: 10 GB | Monthly Growth: 40 GB | Expected: 500 GB (0.5 TB)
  - Policy: Weekly Full, Daily Incremental
  - Retention: 180 days (6 months)

---

## 5. Technical Gaps to Remedy Before Launch
1. **FCM Push Notification Adapter:** Current adapter posts to FCM v1 without OAuth2 bearer minted from service-account JSON; needs patch.
2. **Admin Map Migration:** Admin panel is still using Leaflet/OSM/Nominatim (~815 lines); must be migrated to Google Maps JavaScript API.
3. **BullMQ Worker Processors:** Only 1 of 21 queues has a processor (`otp-send`); remaining queues need assignment.
4. **NestJS 10 -> 11 Upgrade:** Resolve npm audit vulnerabilities in `multer` and `exceljs`.
5. **CompreFace Docker Deployment:** Deploy CompreFace on local Egyptian WE infra to keep biometric facial data sovereign under Egyptian Law 151/2018.
