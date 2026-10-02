import { site } from '../content/site';
import { Arrow, Reveal } from './Primitives';
import PathfindingLab from './PathfindingLab';
import LinkIcon from './LinkIcon';

export default function About() {
  const resources = [
    ...(site.resume ? [{ label: 'Résumé', href: site.resume, download: true }] : []),
    ...site.socials,
  ];
  return (
    <section className="about-section content-section" id="about" tabIndex={-1} aria-labelledby="about-title">
      <Reveal className="about-heading">
        <p className="eyebrow section-kicker"><span>[02]</span> PROFILE NOTES</p>
        <h2 id="about-title">{site.aboutTitle}</h2>
        <PathfindingLab />
      </Reveal>
      <Reveal className="about-copy" delay={0.08}>
        <span className="draft-label eyebrow">README.TXT</span>
        {site.aboutParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        <div className="interest-list">{site.interests.map((interest) => <span key={interest}>{interest}</span>)}</div>
        <div className="profile-resources" aria-label="Profile links">
          {resources.map(({ label, href, download }) => (
            <a key={label} href={href} download={download || undefined} target={download ? undefined : '_blank'} rel={download ? undefined : 'noreferrer'}><LinkIcon label={label} />{label}<Arrow diagonal /></a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
