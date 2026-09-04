/**
 * The terms and conditions.
 *
 * **Page-owned copy, not part of the global deck.** The document is ~10KB per
 * language, and anything re-exported from `content/en/index.js` is eager on
 * every route — putting the body there cost 20KB of eager JS, measured, paid
 * for on the homepage by every visitor who never opens a contract. It is
 * imported by the terms route and merged with `usePageContent`, so it lands in
 * that route's lazy chunk. Do not add this file to either `content` index.
 *
 * Captured from ecomsniper.io/terms-and-conditions on 4 Sep 2026 and checked
 * clause by clause against the live DOM before the page was built: fifteen
 * sections, 37 numbered clauses, 44 of 45 strings byte-identical. An earlier
 * note in this repo recorded their page as empty; that was a page read before
 * it had hydrated. See `docs/source-copy/terms-and-conditions.md`.
 *
 * Kept verbatim because it is a contract, and a rebuild that quietly improves
 * a binding document creates a second version of an agreement people have
 * already accepted. Three defects are therefore reproduced rather than fixed,
 * and raised with the client in `docs/ISSUES.md` instead:
 *
 * 1. Clause 6.1 promises a flat 30-day refund from the date of purchase. The
 *    client told us the refund is monthly-plan only, and every marketing page
 *    here qualifies it that way. Their binding document does not.
 * 2. Clause 9.3 contains the literal "[USD$100]" — brackets and all, an
 *    unfilled template placeholder inside a liability cap.
 * 3. Refunds are directed to sammy@ecomsniper.io, a personal address, while
 *    the published contact address is management@ecomsniper.io.
 *
 * NOT LEGALLY REVIEWED. Same open item as the privacy and cookie policies.
 */
export const TERMS = {
  title: 'Terms and Conditions',
  updated: 'Last updated 18 March 2025',
  sections: [
    {
      heading: '1. Introduction',
      body: [
        '1.1 Welcome to EcomSniper. By accessing or using our website and services, including our AI-powered automation software and Chrome extension (the “Software”), you agree to be bound by these Terms and Conditions (“Terms”) and our Privacy Policy. Please read these Terms carefully before using our site or purchasing our Software.',
        '1.2 Acceptance of Terms. If you do not agree to these Terms, you must not access or use our services.',
      ],
    },
    {
      heading: '2. Services Provided',
      body: [
        '2.1 Dropshipping Automation. EcomSniper offers AI-powered automation software designed to optimize and automate the process of dropshipping on eBay. Our Chrome extension helps users create listings, manage orders, and streamline their e-commerce business (collectively, the “Service”).',
        '2.2 No Guarantee of Results. While our Software aims to optimize and automate certain tasks, we do not guarantee any specific outcomes (such as increased sales or profits).',
      ],
    },
    {
      heading: '3. Unauthorized Use and Intellectual Property Protection',
      body: ['3.1 Prohibited Acts. You may not, under any circumstances:'],
      list: [
        'Reverse-engineer, decompile, or modify the Software.',
        'Resell, redistribute, or sublicense access to the Software.',
        'Attempt to bypass security measures or gain unauthorized access to restricted areas.',
        'Use our Software for any unauthorized commercial or illegal purposes.',
      ],
      after: [
        '3.2 License. Upon purchasing or subscribing to our Software, we grant you a non-exclusive, non-transferable license to use it as intended. You are prohibited from transferring, reselling, or distributing the Software.',
        '3.3 Enforcement. Any individual or entity found violating this policy will face immediate account termination and potential legal action. EcomSniper reserves the right to seek financial damages and pursue legal remedies to protect its intellectual property and other rights.',
      ],
    },
    {
      heading: '4. User Responsibilities',
      body: ['4.1 Account Information. You agree to:'],
      list: [
        'Provide accurate and up-to-date information when registering.',
        'Maintain the security of your account credentials.',
        'Be responsible for all actions taken under your account.',
      ],
      after: [
        '4.2 Compliance. You will not use the Software for any illegal or unauthorized purpose, and you agree to comply with all applicable laws and regulations in your jurisdiction.',
      ],
    },
    {
      heading: '5. Payment and Billing',
      body: [
        '5.1 Payment Methods. All payments for EcomSniper services, including any recurring subscriptions, must be made via the payment methods provided on our website. You are responsible for ensuring your payment details are correct and current.',
        '5.2 Subscription and Renewal. Certain features of our Service require a paid subscription. The subscription will auto-renew at the end of each billing cycle unless you cancel before the renewal date.',
        '5.3 Billing Authorization. By providing a payment method, you represent and warrant that you are authorized to use it and that you authorize us (or our third-party payment processor) to charge it for the total amount of your subscription or purchase.',
      ],
    },
    {
      heading: '6. Refund Policy',
      body: [
        '6.1 Refund Period. We offer a 30-day refund policy from the date of purchase. If you are unsatisfied with the Service within this period, you may be eligible for a refund.',
        '6.2 Exceptions. Refunds are not available after this period unless otherwise specified in writing by EcomSniper. If you believe you qualify for a refund, you may contact us at sammy@ecomsniper.io.',
        '6.3 Refund Abuse and Fraud. EcomSniper maintains a strict zero-tolerance policy for refund abuse. Any attempt to obtain multiple refunds by creating additional accounts or by using false, misleading, or altered information (including different email addresses, payment methods, or billing details) after previously receiving a refund will be considered fraudulent activity.',
        'If such activity is detected, EcomSniper reserves the right to deny refunds, permanently terminate all related accounts, and pursue legal action to the fullest extent permitted by law.',
      ],
    },
    {
      heading: '7. License to Use Software',
      body: [
        '7.1 Scope of License. You are granted a non-exclusive, non-transferable license to use the EcomSniper Chrome extension solely as intended for your personal or business e-commerce operations. This license is subject to your compliance with these Terms and does not grant you any ownership rights in the Software.',
        '7.2 No Warranty. The Software is provided “as is,” without any warranties, express or implied. EcomSniper disclaims all implied warranties of merchantability, fitness for a particular purpose, and non-infringement to the fullest extent permitted by law.',
        '7.3 Liability. EcomSniper is not liable for any damages resulting from the use or inability to use the Software, including data loss, lost profits, or business interruptions.',
      ],
    },
    {
      heading: '8. Modifications to Services',
      body: [
        '8.1 Right to Modify. EcomSniper reserves the right to modify, update, or discontinue its services at any time without prior notice. This may include updates to the Chrome extension, changes to subscription pricing, or alterations to feature sets.',
        '8.2 Notice. We will make reasonable efforts to inform you of significant changes to our services or pricing, but we are under no obligation to do so except as required by law.',
      ],
    },
    {
      heading: '9. Limitation of Liability',
      body: [
        '9.1 No Liability for Losses. To the fullest extent allowed by law, EcomSniper and its affiliates shall not be liable for any indirect, incidental, or consequential damages, including but not limited to lost profits, revenue, or data, arising from or related to your use of our Software or inability to use it.',
        '9.2 Unauthorized Access. We are not responsible for unauthorized access to your account or data breaches caused by third parties, unless resulting from our own gross negligence or willful misconduct.',
        '9.3 Maximum Liability. In no event shall EcomSniper’s total cumulative liability exceed the fees you have paid to us in the twelve (12) months preceding the event giving rise to the liability or [USD$100], whichever is greater.',
        '9.4 Consumer Protections. If you reside in a jurisdiction that does not allow the exclusion or limitation of certain damages, some of the above limitations may not apply to you. In such jurisdictions, our liability shall be limited to the greatest extent permitted by law.',
      ],
    },
    {
      heading: '10. Intellectual Property',
      body: [
        '10.1 Ownership. All content, including but not limited to software code, design, text, graphics, logos, and trademarks, is the intellectual property of EcomSniper. It is protected by applicable copyright and trademark laws.',
        '10.2 Prohibited Use. Any unauthorized reproduction, distribution, or use of our intellectual property is strictly prohibited and may result in legal action.',
      ],
    },
    {
      heading: '11. Termination',
      body: [
        '11.1 By EcomSniper. We reserve the right to terminate or suspend your account at any time, without notice, if we believe you have violated these Terms or engaged in unlawful behavior.',
        '11.2 By User. You may terminate your account or subscription at any time via your account settings or by contacting support. Termination does not entitle you to any refund unless expressly stated in Section 6 of these Terms.',
        '11.3 Effects of Termination. Upon termination, your license to use our Software ceases immediately, and we may delete or deactivate your account data, unless otherwise required by law.',
      ],
    },
    {
      heading: '12. Privacy Policy',
      body: [
        '12.1 Data Collection and Use. Your use of our services is also governed by our Privacy Policy, which describes how we collect, use, and protect your personal information.',
        '12.2 GDPR and CCPA Compliance. If you reside in a jurisdiction with stringent data protection laws (e.g., the EU’s GDPR or California’s CCPA), refer to our Privacy Policy for details on how we comply with these regulations and your corresponding rights.',
      ],
    },
    {
      heading: '13. Governing Law and Dispute Resolution',
      body: [
        '13.1 Governing Law. These Terms are governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict of laws principles. Nothing in these Terms limits any consumer protections that you may be entitled to under the mandatory laws of your place of residence, which cannot be waived by contract.',
        '13.2 Dispute Resolution. You agree that any dispute or claim arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in the Province of Ontario, Canada, unless otherwise required by consumer protection laws in your place of residence.',
        '13.3 No Class Actions (If Applicable). To the extent permitted by law, you agree to resolve any disputes with EcomSniper on an individual basis and waive any right to participate in a class or representative action.',
      ],
    },
    {
      heading: '14. Changes to These Terms',
      body: [
        '14.1 Updates. EcomSniper may update or revise these Terms at any time. When we do so, we will change the “Last Updated” date at the top of this page.',
        '14.2 Acceptance of Revisions. Continued use of our services after any such update or revision constitutes your acceptance of the revised Terms. If you do not agree to the new Terms, you must discontinue use of our services.',
      ],
    },
    {
      heading: '15. Contact Us',
      body: [
        '15.1 Inquiries. If you have any questions or concerns regarding these Terms, please contact us at:',
        'EcomSniper, sammy@ecomsniper.io',
      ],
    },
  ],
};
