"use strict";
const fs = require('fs');
const path = require('path');

const binPath = path.resolve(__dirname, 'node_modules', '@react-router', 'dev', 'bin.js');

try {
    if (fs.existsSync(binPath)) {
        let content = fs.readFileSync(binPath, 'utf8');
        const patchString = '\nprocess.argv = process.argv.filter(arg => arg !== "--no-typecheck");\n';

        if (!content.includes(patchString.trim())) {
            content = content.replace('#!/usr/bin/env node', '#!/usr/bin/env node' + patchString);
            fs.writeFileSync(binPath, content, 'utf8');
            console.log('✅ Successfully patched @react-router/dev/bin.js to ignore --no-typecheck');
        } else {
            console.log('ℹ️ @react-router/dev/bin.js is already patched.');
        }
    } else {
        console.log('⚠️ @react-router/dev/bin.js not found. Skipping patch.');
    }
} catch (error) {
    console.error('❌ Failed to patch @react-router/dev/bin.js:', error);
}
