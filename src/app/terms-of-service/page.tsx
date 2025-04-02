import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service | Cognitive Rewire",
  description:
    "Read our terms of service and user agreement for using the Cognitive Rewire platform.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500 mb-8 text-center">
          Last Updated: July 1, 2024
        </p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <p>
              Welcome to Cognitive Rewire. Please read these Terms of Service
              ("Terms") carefully as they contain important information about
              your legal rights, remedies, and obligations. By accessing or
              using the Cognitive Rewire platform, you agree to comply with and
              be bound by these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By creating an account, accessing, or using the Cognitive Rewire
              platform, you agree to be bound by these Terms and our Privacy
              Policy. If you do not agree to these Terms, you may not access or
              use the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2>2. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. If we make changes, we will
              provide notice by updating the date at the top of these Terms and,
              in some cases, we may provide additional notice. Your continued
              use of the platform after such changes constitutes your acceptance
              of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2>3. Account Registration</h2>
            <p>
              To use certain features of the platform, you must create an
              account. You agree to provide accurate, current, and complete
              information during the registration process and to update such
              information to keep it accurate, current, and complete. You are
              responsible for safeguarding your password and for all activities
              that occur under your account. You agree to notify us immediately
              of any unauthorized use of your account.
            </p>
          </section>

          <section className="mb-8">
            <h2>4. Subscription and Payments</h2>
            <p>
              <strong>4.1 Subscription Plans:</strong> Cognitive Rewire offers
              various subscription plans, including a free plan with limited
              features and premium plans with additional features. Details of
              each plan are available on our pricing page.
            </p>
            <p>
              <strong>4.2 Payment:</strong> By subscribing to a premium plan,
              you agree to pay all fees applicable to your subscription. We use
              third-party payment processors and you agree to their terms of
              service when making payments through our platform.
            </p>
            <p>
              <strong>4.3 Automatic Renewal:</strong> Subscriptions
              automatically renew at the end of each billing period unless
              canceled before the renewal date. You can cancel your subscription
              at any time through your account settings.
            </p>
            <p>
              <strong>4.4 Refunds:</strong> We offer a 14-day money-back
              guarantee for new subscribers. Refund requests after this period
              are considered on a case-by-case basis. To request a refund,
              please contact support@cognitiverewire.com.
            </p>
            <p>
              <strong>4.5 Price Changes:</strong> We reserve the right to change
              our subscription prices. Any price changes will be communicated to
              you in advance and will apply to the next billing period.
            </p>
          </section>

          <section className="mb-8">
            <h2>5. User Content</h2>
            <p>
              <strong>5.1 Definition:</strong> "User Content" means any content
              that you upload, create, or otherwise provide to the platform,
              including audio files, affirmations, and other materials.
            </p>
            <p>
              <strong>5.2 Ownership:</strong> You retain ownership of your User
              Content. By uploading User Content, you grant us a worldwide,
              non-exclusive, royalty-free license to use, reproduce, modify,
              adapt, publish, translate, and distribute your User Content in
              connection with providing and promoting the platform.
            </p>
            <p>
              <strong>5.3 Responsibility:</strong> You are solely responsible
              for your User Content and the consequences of posting or
              publishing it. You represent and warrant that you own or have the
              necessary rights to your User Content and that it does not violate
              these Terms or any applicable laws.
            </p>
            <p>
              <strong>5.4 Prohibited Content:</strong> You agree not to upload
              User Content that is illegal, harmful, threatening, abusive,
              harassing, defamatory, vulgar, obscene, or otherwise
              objectionable. We reserve the right to remove any User Content
              that violates these Terms or that we find objectionable for any
              reason.
            </p>
          </section>

          <section className="mb-8">
            <h2>6. Intellectual Property</h2>
            <p>
              <strong>6.1 Platform Content:</strong> The platform and its
              original content, features, and functionality are owned by
              Cognitive Rewire and are protected by copyright, trademark, and
              other intellectual property laws.
            </p>
            <p>
              <strong>6.2 License to Use Platform:</strong> Subject to these
              Terms, we grant you a limited, non-exclusive, non-transferable,
              and revocable license to access and use the platform for your
              personal, non-commercial use.
            </p>
            <p>
              <strong>6.3 Restrictions:</strong> You may not:
            </p>
            <ul>
              <li>
                Copy, modify, or create derivative works based on the platform
                or its content
              </li>
              <li>
                Distribute, publicly display, publicly perform, or otherwise
                exploit the platform or its content
              </li>
              <li>Reverse engineer, decompile, or disassemble the platform</li>
              <li>
                Remove any copyright or other proprietary notices from the
                platform
              </li>
              <li>Transfer your rights under these Terms to any third party</li>
            </ul>
            <p>
              <strong>6.4 Feedback:</strong> If you provide us with any feedback
              or suggestions regarding the platform, you grant us the right to
              use such feedback without restriction or compensation to you.
            </p>
          </section>

          <section className="mb-8">
            <h2>7. Prohibited Activities</h2>
            <p>
              You agree not to engage in any of the following prohibited
              activities:
            </p>
            <ul>
              <li>Violating any applicable laws or regulations</li>
              <li>
                Impersonating any person or entity or falsely stating or
                misrepresenting your affiliation with a person or entity
              </li>
              <li>
                Interfering with or disrupting the platform or servers or
                networks connected to the platform
              </li>
              <li>
                Attempting to gain unauthorized access to any portion of the
                platform or any other systems or networks connected to the
                platform
              </li>
              <li>
                Using the platform for any commercial purposes without our
                express written consent
              </li>
              <li>
                Engaging in any activity that could disable, overburden, damage,
                or impair the platform
              </li>
              <li>
                Using any robot, spider, or other automatic device, process, or
                means to access the platform for any purpose
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>8. Disclaimer of Warranties</h2>
            <p>
              THE PLATFORM AND ALL CONTENT AND SERVICES PROVIDED THROUGH THE
              PLATFORM ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS.
              COGNITIVE REWIRE EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND,
              WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
              IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p>
              COGNITIVE REWIRE MAKES NO WARRANTY THAT THE PLATFORM WILL MEET
              YOUR REQUIREMENTS, BE AVAILABLE ON AN UNINTERRUPTED, SECURE, OR
              ERROR-FREE BASIS, OR THAT DEFECTS WILL BE CORRECTED.
            </p>
            <p>
              COGNITIVE REWIRE MAKES NO CLAIMS OR GUARANTEES THAT THE USE OF
              SUBLIMINAL AUDIO WILL RESULT IN ANY SPECIFIC OUTCOMES OR BENEFITS.
              RESULTS MAY VARY FROM PERSON TO PERSON.
            </p>
          </section>

          <section className="mb-8">
            <h2>9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, COGNITIVE
              REWIRE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS,
              DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR
              ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, THE PLATFORM.
            </p>
            <p>
              IN NO EVENT SHALL COGNITIVE REWIRE'S TOTAL LIABILITY TO YOU FOR
              ALL CLAIMS ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY
              TO USE, THE PLATFORM EXCEED THE AMOUNTS PAID BY YOU TO COGNITIVE
              REWIRE DURING THE TWELVE (12) MONTH PERIOD PRECEDING THE EVENT
              GIVING RISE TO THE LIABILITY.
            </p>
          </section>

          <section className="mb-8">
            <h2>10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Cognitive Rewire
              and its officers, directors, employees, agents, and affiliates
              from and against any and all claims, liabilities, damages, losses,
              costs, expenses, or fees (including reasonable attorneys' fees)
              that such parties may incur as a result of or arising from your
              violation of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2>11. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the
              platform at any time, without prior notice or liability, for any
              reason, including if you violate these Terms. Upon termination,
              your right to use the platform will immediately cease.
            </p>
          </section>

          <section className="mb-8">
            <h2>12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the State of California, without regard to its
              conflict of law provisions. Any legal action or proceeding arising
              out of or relating to these Terms shall be brought exclusively in
              the federal or state courts located in San Francisco, California.
            </p>
          </section>

          <section>
            <h2>13. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
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
              Email: legal@cognitiverewire.com
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
