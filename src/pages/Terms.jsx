import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'
import { cfg } from '../config'
import PageWrap from '../components/PageWrap'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

const sections = [
  {
    title: '1. Use of Services',
    content: `By accessing and using the services provided by ${cfg.brand || 'Codensons'}, you agree to comply with these Terms & Conditions. Our services include website development, web application development, mobile application development, UI/UX design, and related digital services. You must be at least 18 years of age or have the consent of a legal guardian to engage our services.`,
  },
  {
    title: '2. Intellectual Property',
    content: `Upon full payment for a project, all custom code, designs, and digital assets created specifically for your project are transferred to you. We retain the right to showcase completed work in our portfolio unless otherwise agreed in writing. Third-party assets (fonts, stock images, open-source libraries) remain subject to their respective licences. Our brand name, logo, and proprietary tools remain our intellectual property.`,
  },
  {
    title: '3. Project Delivery & Payments',
    content: `Project timelines and deliverables are agreed upon before work begins. A deposit is typically required to commence work, with remaining payments due at agreed milestones or upon delivery. Delays caused by late feedback or content from the client may extend the timeline. We reserve the right to pause or suspend work if payments are overdue. All prices are quoted in the currency specified in the proposal and are subject to change for future projects.`,
  },
  {
    title: '4. Limitation of Liability',
    content: `${cfg.brand || 'Codensons'} shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our services or deliverables. Our total liability for any claim shall not exceed the amount paid by you for the specific project in question. We do not guarantee specific business outcomes, search engine rankings, or revenue increases, though we strive to deliver the highest quality work.`,
  },
  {
    title: '5. Privacy & Data',
    content: `We respect your privacy and handle all personal and business information with care. Information collected during project discussions, including business details, content, and credentials, is used solely for delivering the agreed services. We do not sell or share your information with third parties. Website analytics and cookies may be used on our website to improve user experience. By using our website, you consent to this data collection.`,
  },
  {
    title: '6. Changes to Terms',
    content: `We reserve the right to update these Terms & Conditions at any time. Changes will be reflected on this page with an updated revision date. Continued use of our services after changes constitutes acceptance of the revised terms. We encourage you to review this page periodically.`,
  },
  {
    title: '7. Contact',
    content: `If you have questions about these Terms & Conditions, please contact us via the details on our Contact page or reach out directly through WhatsApp, email, or phone as listed on our website.`,
  },
]

export default function Terms() {
  return (
    <PageWrap>
      <PageHeader eyebrow="Legal" title={<span className="gt">Terms & Conditions</span>} text="Please read these terms carefully before using our services." />
      <article className="wrap pb-20">
        <div className="mx-auto max-w-3xl space-y-8">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="glass p-8">
                <h2 className="text-xl font-bold md:text-2xl">{s.title}</h2>
                <p className="mt-4 leading-relaxed text-mu">{s.content}</p>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <p className="text-center text-sm text-mu">Last updated: October 2026</p>
          </Reveal>
          <div className="text-center">
            <Link to="/" className="btn-ghost"><FaArrowLeft /> Back to home</Link>
          </div>
        </div>
      </article>
    </PageWrap>
  )
}
