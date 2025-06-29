import fs from 'fs';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import archiver from 'archiver';

// Simple test to verify package.json exists
console.log('Checking if package.json exists:', fs.existsSync('package.json'));
console.log('Checking if package-lock.json exists:', fs.existsSync('package-lock.json'));

// List current directory files
console.log('\nCurrent directory contents:');
fs.readdirSync('.').forEach(file => {
  console.log('-', file);
});