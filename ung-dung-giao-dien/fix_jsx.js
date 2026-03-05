const fs = require('fs');
const files = [
    'app/traffic-user-la-gi/page.tsx',
    'app/huong-dan/page.tsx',
    'app/cau-hoi-thuong-gap/page.tsx'
];

files.forEach(f => {
    try {
        let content = fs.readFileSync(f, 'utf8');
        content = content.replace(/ > /g, ' &gt; ');
        content = content.replace(/ < /g, ' &lt; ');
        content = content.replace(/> 3/g, '&gt; 3');
        content = content.replace(/< 30/g, '&lt; 30');
        content = content.replace(/->/g, '-&gt;');
        content = content.replace(/=>/g, '=&gt;');
        content = content.replace(/→/g, '&rarr;');
        fs.writeFileSync(f, content);
        console.log(`Fixed ${f}`);
    } catch (e) {
        console.error(`Error processing ${f}:`, e);
    }
});
