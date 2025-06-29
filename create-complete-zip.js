import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

function createCompleteProjectZip() {
  const output = fs.createWriteStream('anfa-maidcare-complete.zip');
  const archive = archiver('zip', {
    zlib: { level: 9 }
  });

  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('Complete project ZIP created: anfa-maidcare-complete.zip');
  });

  archive.on('error', function(err) {
    throw err;
  });

  archive.pipe(output);

  // Essential files that must be included
  const essentialFiles = [
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'vite.config.ts',
    'tailwind.config.ts',
    'postcss.config.js',
    'components.json',
    'drizzle.config.ts',
    'LOCAL_SETUP_GUIDE.md',
    '.gitignore'
  ];

  // Add essential files first
  essentialFiles.forEach(file => {
    if (fs.existsSync(file)) {
      archive.file(file, { name: file });
      console.log(`Added essential file: ${file}`);
    } else {
      console.log(`Warning: Essential file not found: ${file}`);
    }
  });

  // Add directories
  const directories = ['client', 'server', 'shared'];
  
  directories.forEach(dir => {
    if (fs.existsSync(dir)) {
      archive.directory(dir, dir);
      console.log(`Added directory: ${dir}`);
    } else {
      console.log(`Warning: Directory not found: ${dir}`);
    }
  });

  archive.finalize();
}

createCompleteProjectZip();