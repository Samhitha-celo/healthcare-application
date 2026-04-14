from pathlib import Path
import re

base = Path("html_files")
css_dir = base / "css"
js_dir = base / "js"
css_dir.mkdir(exist_ok=True)
js_dir.mkdir(exist_ok=True)

html_files = sorted(base.glob('*.html'))
for html_path in html_files:
    name = html_path.stem
    text = html_path.read_text(encoding='utf-8')

    style_match = re.search(r'<style>(.*?)</style>', text, re.S)
    if style_match:
        css_content = style_match.group(1).strip() + '\n'
        (css_dir / f'{name}.css').write_text(css_content, encoding='utf-8')
        text = text[:style_match.start()] + text[style_match.end():]
    else:
        (css_dir / f'{name}.css').write_text('/* No page-specific CSS */\n', encoding='utf-8')

    marker = 'href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">'
    if marker in text:
        text = text.replace(marker, marker + f"\n  <link rel=\"stylesheet\" href=\"css/{name}.css\">", 1)
    else:
        text = text.replace('</head>', f'  <link rel="stylesheet" href="css/{name}.css">\n</head>', 1)

    inline_scripts = re.findall(r'<script>(.*?)</script>', text, re.S)
    js_content = '\n'.join(script.strip() for script in inline_scripts if script.strip())
    if not js_content.strip():
        js_content = '/* No page-specific JavaScript */\n'
    (js_dir / f'{name}.js').write_text(js_content + '\n', encoding='utf-8')
    text = re.sub(r'<script>(.*?)</script>', '', text, flags=re.S)

    text = re.sub(
        r'<script\s+src="https://cdn\.jsdelivr\.net/npm/bootstrap@5\.3\.0/dist/js/bootstrap\.bundle\.min\.js"></script>',
        '__BOOTSTRAP__', text)
    text = text.replace('__BOOTSTRAP__', '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>', 1)
    text = text.replace('__BOOTSTRAP__', '')

    js_tag = f'<script src="js/{name}.js"></script>'
    if js_tag not in text:
        if '</body>' in text:
            text = text.replace('</body>', f'  {js_tag}\n</body>', 1)
        else:
            text += f'\n  {js_tag}\n'

    text = re.sub(r'\n{3,}', '\n\n', text)
    html_path.write_text(text, encoding='utf-8')

print('Updated HTML pages with external CSS/JS')
