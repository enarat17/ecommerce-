import DOMPurify from 'dompurify';

export function sanitizeHtml(html: string | Node) {
  return DOMPurify.sanitize(html);
}
