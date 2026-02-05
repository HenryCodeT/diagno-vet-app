# The "Why" Document

## Overview

After reviewing the videos, a key issue was identified in the early user experience:  
users were accessing the Dashboard before completing their initial setup. This caused distractions, unnecessary loading states, and a fragmented onboarding experience.

To improve user retention, the onboarding flow was redesigned to be a **single, uninterrupted journey** that must be completed before accessing the platform.

---

## Why This Change Matters

- Reduces cognitive load during first use
- Removes premature exposure to non-essential features
- Creates a clear and guided path to activation
- Improves perceived product quality and consistency

---

## Optimized Onboarding Flow

### 1. No Early Dashboard Access

- Users cannot access “My Studies” or “New Report” until onboarding is completed.
- After login, the system directly loads the correct onboarding step without attempting to load the Dashboard.

### 2. Single Onboarding Journey

Onboarding is grouped into one view with two mandatory steps:

- **Clinic Identity (`/pre-confirmation`)**  
  Clinic name, address, and phone number.

- **Professional Identity (`/post-confirmation`)**  
  Role, full name, and professional license.

### 3. Middleware Enforcement

The middleware enforces the flow:

- Not logged in → Login
- Missing clinic data → `/pre-confirmation`
- Missing professional data → `/post-confirmation`
- All completed → Dashboard access

---

## UI & Consistency Improvements

- Global language configuration for Login, Onboarding, and Dashboard
- Sidebar added for better action visibility
- Single UI kit with a defined color palette and consistent buttons

---

## Result

A focused, consistent onboarding experience that removes friction and increases the likelihood of user activation and retention.
