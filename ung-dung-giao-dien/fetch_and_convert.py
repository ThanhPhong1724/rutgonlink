import sys
import re
import urllib.request
import os

url = sys.argv[1]
output = sys.argv[2]

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
except Exception as e:
    print(f"Failed to fetch {url}: {e}")
    sys.exit(1)

def html_to_jsx(html):
    jsx = re.sub(r'\bclass=', 'className=', html)
    jsx = re.sub(r'\bfor=', 'htmlFor=', jsx)
    jsx = re.sub(r'(<img[^>]*?)(?<!/)>', r'\1 />', jsx)
    jsx = re.sub(r'(<input[^>]*?)(?<!/)>', r'\1 />', jsx)
    jsx = re.sub(r'(<br[^>]*?)(?<!/)>', r'\1 />', jsx)
    jsx = re.sub(r'(<hr[^>]*?)(?<!/)>', r'\1 />', jsx)
    def style_replacer(match):
        style_str = match.group(1)
        rules = style_str.split(';')
        jsx_rules = []
        for rule in rules:
            if not rule.strip(): continue
            parts = rule.split(':', 1)
            if len(parts) == 2:
                key = parts[0].strip()
                val = parts[1].strip()
                key_parts = key.split('-')
                camel_key = key_parts[0] + ''.join(x.title() for x in key_parts[1:])
                jsx_rules.append(f"{camel_key}: '{val}'")
        return "style={{" + ", ".join(jsx_rules) + "}}"
    jsx = re.sub(r'style="([^"]*)"', style_replacer, jsx)
    jsx = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', jsx, flags=re.DOTALL)
    jsx = re.sub(r'onclick="[^"]*"', '', jsx)
    jsx = re.sub(r'onchange="[^"]*"', '', jsx)
    jsx = re.sub(r'oninput="[^"]*"', '', jsx)
    # also remove any script tags inside main
    jsx = re.sub(r'<script.*?>.*?</script>', '', jsx, flags=re.DOTALL)
    return jsx

match = re.search(r'<main id="content"[^>]*>(.*?)</main>', content, re.DOTALL)
if match:
    title_match = re.search(r'<title>(.*?)</title>', content)
    title = title_match.group(1) if title_match else "Trang"

    main_content = match.group(1)
    jsx_content = html_to_jsx(main_content)
    
    os.makedirs(os.path.dirname(output), exist_ok=True)
    
    with open(output, 'w', encoding='utf-8') as out:
        out.write('import Link from "next/link";\n\n')
        out.write(f'export const metadata = {{ title: "{title}" }};\n\n')
        out.write('export default function Page() {\n')
        out.write('  return (\n    <>\n')
        out.write(jsx_content)
        out.write('\n    </>\n  );\n}\n')
    print(f"Generated {output} successfully.")
else:
    print("Main content not found.")
