import { FiFileText } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

export default function LinkIcon({ label }) {
  const Icon = { GitHub: FaGithub, LinkedIn: FaLinkedinIn, Résumé: FiFileText }[label];
  return Icon ? <Icon className="link-icon" size={14} aria-hidden="true" focusable="false" /> : null;
}
