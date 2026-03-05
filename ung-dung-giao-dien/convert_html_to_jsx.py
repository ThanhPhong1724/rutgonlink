import re

def html_to_jsx(html):
    # Convert class to className
    jsx = re.sub(r'\bclass=', 'className=', html)
    # Convert for to htmlFor
    jsx = re.sub(r'\bfor=', 'htmlFor=', jsx)
    # Close img tags
    jsx = re.sub(r'(<img[^>]*?)(?<!/)>', r'\1 />', jsx)
    # Close input tags
    jsx = re.sub(r'(<input[^>]*?)(?<!/)>', r'\1 />', jsx)
    # Close br tags
    jsx = re.sub(r'(<br[^>]*?)(?<!/)>', r'\1 />', jsx)
    # Close hr tags
    jsx = re.sub(r'(<hr[^>]*?)(?<!/)>', r'\1 />', jsx)
    # Convert inline styles (very basic, might need manual fix)
    # We will just write a regex to convert style="key: value; key2: value" to style={{key: 'value', key2: 'value'}}
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
                # camelCase key
                key_parts = key.split('-')
                camel_key = key_parts[0] + ''.join(x.title() for x in key_parts[1:])
                jsx_rules.append(f"{camel_key}: '{val}'")
        return "style={{" + ", ".join(jsx_rules) + "}}"

    jsx = re.sub(r'style="([^"]*)"', style_replacer, jsx)
    
    # replace HTML comments
    jsx = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', jsx, flags=re.DOTALL)

    # replace onClick
    jsx = re.sub(r'onclick="[^"]*"', '', jsx)
    jsx = re.sub(r'onchange="[^"]*"', '', jsx)
    jsx = re.sub(r'oninput="[^"]*"', '', jsx)

    return jsx

with open('C:\\Users\\Admin\\Downloads\\RutGonLink\\ung-dung-giao-dien\\public\\trafficuser.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract main content
match = re.search(r'<main id="content" role="main">(.*?)</main><!-- /main -->', content, re.DOTALL)
if match:
    main_content = match.group(1)
    jsx_content = html_to_jsx(main_content)
    
    with open('C:\\Users\\Admin\\Downloads\\RutGonLink\\ung-dung-giao-dien\\app\\components\\PublicHomeJSX.tsx', 'w', encoding='utf-8') as out:
        out.write('import Link from "next/link";\n\n')
        out.write('export default function PublicHome() {\n')
        out.write('  return (\n    <>\n')
        out.write(jsx_content)
        out.write('\n    </>\n  );\n}\n')
    print("JSX generated successfully.")
else:
    print("Main content not found.")
