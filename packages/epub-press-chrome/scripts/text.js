const REMOVE_SELECTORS = [
    'script',
    'style',
    'noscript',
    'header',
    'footer',
    'nav',
    'aside',
    'form',
    'button',
    'svg',
    'canvas',
    'iframe',
    'object',
];

function extractTextFromHtml(html) {
    if (!html) {
        return '';
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    REMOVE_SELECTORS.forEach((selector) => {
        doc.querySelectorAll(selector).forEach((node) => node.remove());
    });

    const root = doc.querySelector('article') || doc.querySelector('main') || doc.body || doc.documentElement;
    return root && root.textContent ? root.textContent : '';
}

function normalizeTextForTts(text) {
    if (!text) {
        return '';
    }

    let out = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    out = out.normalize('NFKC');
    out = out
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2013\u2014]/g, '-')
        .replace(/\u2026/g, '...')
        .replace(/\u00A0/g, ' ');

    out = out.replace(/\[cite_start\]/gi, '');
    out = out.replace(/\[cite:\s*\d+(?:\s*,\s*\d+)*\]/gi, '');
    out = out.replace(/(\w)-\n(?=\w)/g, '$1');
    out = out.replace(/\[\s*\d+(?:\s*,\s*\d+)*\s*\]/g, '');
    out = out.replace(/([.!?"])\s*\d{1,2}(?=\s|$)/g, '$1');
    out = out.replace(/\b\[([A-Za-z])\]([a-z]+)/g, '$1$2');
    out = out.replace(/\s*\(\s*/g, ', ').replace(/\s*\)\s*/g, ', ');
    out = out.replace(/\s+,/g, ',').replace(/,\s*,/g, ', ');

    out = out.replace(/[ \t\f\v]+/g, ' ');
    out = out.replace(/\n{3,}/g, '\n\n');

    const paragraphs = out.split('\n\n').map((p) => p.replace(/\s+/g, ' ').trim()).filter(Boolean);
    return paragraphs.join('\n\n').trim();
}

function buildTextExport(book, sections) {
    const headerParts = [];
    if (book && book.title) {
        headerParts.push(normalizeTextForTts(book.title));
    }
    if (book && book.description) {
        headerParts.push(normalizeTextForTts(book.description));
    }

    const header = headerParts.length ? `${headerParts.join('\n')}\n\n` : '';
    const sectionParts = (sections || []).map((section) => {
        const rawText = extractTextFromHtml(section.html);
        const cleanText = normalizeTextForTts(rawText);
        if (!cleanText) {
            return null;
        }
        const title = section.title ? normalizeTextForTts(section.title) : '';
        return title ? `${title}\n\n${cleanText}` : cleanText;
    }).filter(Boolean);

    if (!sectionParts.length) {
        return '';
    }

    return `${header}${sectionParts.join('\n\n\n')}\n`;
}

export { buildTextExport };
