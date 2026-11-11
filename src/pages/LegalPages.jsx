import React from 'react';
import { SITE } from '../data/siteConfig';

const H = ({ children }) => <h2 className="font-serif text-2xl font-bold text-[#002156] mt-10 mb-3">{children}</h2>;
const P = ({ children }) => <p className="text-slate-800 leading-relaxed mb-4">{children}</p>;
const UL = ({ items }) => (
    <ul className="list-disc pl-6 mb-4 space-y-1.5 text-slate-800 leading-relaxed">
        {items.map((i) => <li key={i}>{i}</li>)}
    </ul>
);
const Mail = () => <a className="text-[#FD6202] underline" href={`mailto:${SITE.privacyEmail}`}>{SITE.privacyEmail}</a>;

const Shell = ({ title, children }) => (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <a href="#/" className="text-sm font-bold text-[#FD6202] underline">← Back to home</a>
        <h1 className="font-serif text-4xl font-bold text-[#002156] mt-6 mb-2">{title}</h1>
        <p className="text-sm text-slate-600 mb-6">Last updated: {SITE.lastUpdated}</p>
        {SITE.legalDraft && (
            <div role="note" className="mb-8 rounded border border-amber-400 bg-amber-50 p-4 text-sm text-amber-950">
                Draft for review: this policy has not yet been reviewed by a qualified lawyer. Items in square
                brackets must be completed before launch.
            </div>
        )}
        {children}
    </article>
);

export const Privacy = () => (
    <Shell title="Privacy Policy">
        <P>
            This policy explains how {SITE.name} ("we", "us") handles information when you visit this website. The
            website is operated by {SITE.operatorName}, {SITE.operatorAddress}.
        </P>
        <H>1. What we collect</H>
        <P>
            This website does not have accounts, contact forms, newsletter sign-ups, comments or payments, and we
            do not ask you to provide personal information on it. We do not use analytics, advertising or
            social-media tracking tools.
        </P>
        <P>
            If you email us, we receive your email address and whatever you choose to include in your message.
        </P>
        <H>2. Technical data processed by our hosting provider</H>
        <P>
            The website is delivered through a hosting provider (Vercel Inc.). When you load a page, the host and
            its network automatically process technical data such as your IP address, browser type, requested page
            and time of request, to deliver the site, keep it secure and diagnose faults. This data is processed
            by the hosting provider and may be stored on servers outside India.
        </P>
        <H>3. Third-party services</H>
        <P>
            Fonts, images and scripts are served from this website itself. The site does not load content from
            Google Fonts, image CDNs, avatar services or similar third parties.
        </P>
        <H>4. Why we use information</H>
        <UL items={[
            'To operate, secure and maintain the website.',
            'To reply to emails you send us.',
        ]} />
        <H>5. Sharing</H>
        <P>
            We do not sell personal information. We share it only with service providers that help us run the
            website (such as the hosting provider above), or where required by law.
        </P>
        <H>6. Retention</H>
        <P>
            Emails are kept only as long as needed to handle your request and meet legal obligations. Hosting
            logs are kept according to the hosting provider's retention settings.
        </P>
        <H>7. Your rights</H>
        <P>
            Subject to applicable law, including India's Digital Personal Data Protection Act, 2023, you may ask
            us to confirm what personal data we hold about you, correct or erase it, and withdraw consent where
            processing is based on consent. You may also raise a grievance with us. Contact: <Mail />. If we are
            unable to resolve your concern, you may approach the Data Protection Board of India once it is
            operational.
        </P>
        <H>8. Children</H>
        <P>This website is not directed at children and does not knowingly collect their personal data.</P>
        <H>9. Changes</H>
        <P>
            We will update this page if the website's features change (for example, if forms or analytics are
            added) and revise the date above.
        </P>
        <H>10. Contact</H>
        <P>{SITE.operatorName}, {SITE.operatorAddress}. Email: <Mail /></P>
    </Shell>
);

export const Terms = () => (
    <Shell title="Terms of Use">
        <P>
            By using this website you agree to these terms. The website is operated by {SITE.operatorName},{' '}
            {SITE.operatorAddress}. If you do not agree, please do not use it.
        </P>
        <H>1. Use of the website</H>
        <P>
            You may browse the site for personal, non-commercial purposes. Do not misuse it: no attempts to
            disrupt, probe or gain unauthorised access, no automated scraping that burdens the service, and no
            unlawful use.
        </P>
        <H>2. Sample content</H>
        <P>
            The sample rankings shown on this website are illustrative previews only and are not official ITE
            rankings. The championship participant lists and event details are provided for the inaugural ITE
            Championship and may be updated by the organiser. The champions section will be updated after the event.
        </P>
        <H>3. Sponsor names and logos</H>
        <P>
            Any third-party names, trademarks or logos displayed on this website remain the property of their respective owners. Their display does not imply a partnership, sponsorship or endorsement.
        </P>
        <H>4. Intellectual property</H>
        <P>
            The site's design, text and code are owned by or licensed to {SITE.operatorName}. Third-party
            trademarks and images remain the property of their respective owners. You may not copy or reuse site
            content without permission, except as allowed by law.
        </P>
        <H>5. Accuracy</H>
        <P>
            Once official data is published, we aim to keep it accurate and current, but schedules, rankings and
            results may change or contain errors. We do not guarantee that the site will be uninterrupted or
            error-free.
        </P>
        <H>6. Third-party links</H>
        <P>We are not responsible for the content or practices of external websites we may link to.</P>
        <H>7. Purchases</H>
        <P>
            This website does not sell tickets, merchandise, memberships or subscriptions. If that changes, a
            refund and cancellation policy will be published before any sale.
        </P>
        <H>8. Limitation of liability</H>
        <P>
            To the extent permitted by law, we are not liable for indirect or consequential loss arising from use
            of the website. Nothing in these terms limits liability that cannot be limited under applicable law.
        </P>
        <H>9. Changes</H>
        <P>We may update these terms and the website at any time. The date above shows the latest version.</P>
        <H>10. Governing law</H>
        <P>
            These terms are governed by the laws of India. Courts at {SITE.governingCity} have jurisdiction,
            subject to any rights you have under mandatory law.
        </P>
        <H>11. Contact</H>
        <P>Email: <Mail /></P>
    </Shell>
);

export const Cookies = () => (
    <Shell title="Cookie Policy">
        <P>
            This website currently does not set cookies and does not store information in your browser using
            local storage, session storage or similar technologies. It uses no analytics, advertising or
            social-media tracking.
        </P>
        <H>Why there is no cookie banner</H>
        <P>
            Because no cookies or trackers are used, there is nothing to ask consent for. If we add any
            non-essential cookies or trackers (for example analytics), we will first add a consent control that
            lets you accept or refuse them and change your choice later, and update this policy.
        </P>
        <H>Server logs</H>
        <P>
            Our hosting provider processes technical request data such as IP addresses to serve and secure the
            site. See the <a className="text-[#FD6202] underline" href="#/privacy">Privacy Policy</a>.
        </P>
        <H>Contact</H>
        <P>Questions: <Mail /></P>
    </Shell>
);
