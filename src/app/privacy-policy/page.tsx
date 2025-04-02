import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Cognitive Rewire",
  description:
    "Learn about how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8 text-center">
          Last Updated: July 1, 2024
        </p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <p>
              At Cognitive Rewire, we take your privacy seriously. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website and use our subliminal
              audio creation service. Please read this privacy policy carefully.
              If you do not agree with the terms of this privacy policy, please
              do not access the site.
            </p>
          </section>

          <section className="mb-8">
            <h2>Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you
              register for an account, create or modify your profile, set
              preferences, sign-up for or make purchases through the Services.
              This information may include:
            </p>
            <ul>
              <li>
                Personal identifiers such as your name, email address, and
                password
              </li>
              <li>
                Profile information such as your username, profile picture, and
                preferences
              </li>
              <li>Payment information when you purchase a subscription</li>
              <li>
                Content you upload, including audio files, affirmations, and
                other materials
              </li>
              <li>Communications you send to us</li>
            </ul>
            <p>
              We also automatically collect certain information about your
              device and how you interact with our Services, including:
            </p>
            <ul>
              <li>
                Device information such as your IP address, browser type,
                operating system, and device identifiers
              </li>
              <li>
                Usage data such as pages visited, features used, and time spent
                on the platform
              </li>
              <li>Location information derived from your IP address</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes, including
              to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our Services</li>
              <li>Process transactions and send related information</li>
              <li>
                Send administrative messages, updates, and security alerts
              </li>
              <li>Respond to your comments, questions, and requests</li>
              <li>
                Personalize your experience and deliver content relevant to your
                interests
              </li>
              <li>
                Monitor and analyze trends, usage, and activities in connection
                with our Services
              </li>
              <li>
                Detect, investigate, and prevent fraudulent transactions and
                other illegal activities
              </li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Sharing of Information</h2>
            <p>
              We may share the information we collect in various ways,
              including:
            </p>
            <ul>
              <li>
                With vendors, consultants, and other service providers who need
                access to such information to carry out work on our behalf
              </li>
              <li>
                In response to a request for information if we believe
                disclosure is in accordance with, or required by, any applicable
                law, regulation, or legal process
              </li>
              <li>
                If we believe your actions are inconsistent with our user
                agreements or policies, or to protect the rights, property, and
                safety of Cognitive Rewire or others
              </li>
              <li>
                In connection with, or during negotiations of, any merger, sale
                of company assets, financing, or acquisition of all or a portion
                of our business by another company
              </li>
              <li>With your consent or at your direction</li>
            </ul>
            <p>
              We may also share aggregated or de-identified information, which
              cannot reasonably be used to identify you.
            </p>
          </section>

          <section className="mb-8">
            <h2>Data Retention</h2>
            <p>
              We store the information we collect about you for as long as is
              necessary for the purpose(s) for which we originally collected it.
              We may retain certain information for legitimate business purposes
              or as required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2>Security</h2>
            <p>
              We take reasonable measures to help protect information about you
              from loss, theft, misuse and unauthorized access, disclosure,
              alteration and destruction. However, no internet or email
              transmission is ever fully secure or error free. In particular,
              email sent to or from the Services may not be secure. Therefore,
              you should take special care in deciding what information you send
              to us via email.
            </p>
          </section>

          <section className="mb-8">
            <h2>Your Choices</h2>
            <p>
              <strong>Account Information:</strong> You may update, correct, or
              delete information about you at any time by logging into your
              online account and modifying your information or by emailing us at
              privacy@cognitiverewire.com. We may retain certain information as
              required by law or for legitimate business purposes.
            </p>
            <p>
              <strong>Cookies:</strong> Most web browsers are set to accept
              cookies by default. If you prefer, you can usually choose to set
              your browser to remove or reject browser cookies. Please note that
              if you choose to remove or reject cookies, this could affect the
              availability and functionality of our Services.
            </p>
            <p>
              <strong>Promotional Communications:</strong> You may opt out of
              receiving promotional emails from Cognitive Rewire by following
              the instructions in those emails. If you opt out, we may still
              send you non-promotional emails, such as those about your account
              or our ongoing business relations.
            </p>
          </section>

          <section className="mb-8">
            <h2>Children's Privacy</h2>
            <p>
              Our Services are not directed to children under 16, and we do not
              knowingly collect personal information from children under 16. If
              we learn we have collected or received personal information from a
              child under 16 without verification of parental consent, we will
              delete that information. If you believe we might have any
              information from or about a child under 16, please contact us at
              privacy@cognitiverewire.com.
            </p>
          </section>

          <section className="mb-8">
            <h2>International Data Transfers</h2>
            <p>
              We are based in the United States and the information we collect
              is governed by U.S. law. If you are accessing the Services from
              outside of the U.S., please be aware that information collected
              through the Services may be transferred to, processed, stored, and
              used in the U.S. and other jurisdictions. Data protection laws in
              the U.S. and other jurisdictions may be different from those of
              your country of residence. Your use of the Services or provision
              of any information therefore constitutes your consent to the
              transfer to and from, processing, usage, sharing, and storage of
              information about you in the U.S. and other jurisdictions as set
              out in this Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2>Changes to this Privacy Policy</h2>
            <p>
              We may change this Privacy Policy from time to time. If we make
              changes, we will notify you by revising the date at the top of the
              policy and, in some cases, we may provide you with additional
              notice (such as adding a statement to our homepage or sending you
              a notification). We encourage you to review the Privacy Policy
              whenever you access the Services or otherwise interact with us to
              stay informed about our information practices and the choices
              available to you.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <p>
              Cognitive Rewire
              <br />
              123 Mindfulness Avenue
              <br />
              Suite 456
              <br />
              San Francisco, CA 94103
              <br />
              Email: privacy@cognitiverewire.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
