// Copy non-TS assets (node icons) into dist, mirroring the source layout.
import { copyFileSync, mkdirSync } from 'node:fs';

mkdirSync('dist/nodes/MailValid', { recursive: true });
copyFileSync('nodes/MailValid/mailvalid.svg', 'dist/nodes/MailValid/mailvalid.svg');
console.log('Assets copied to dist/');
