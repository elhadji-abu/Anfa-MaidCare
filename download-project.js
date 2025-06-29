import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

function createProjectZip() {
  const output = fs.createWriteStream('maidcare-pro-project.zip');
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('Project has been finalized and the output file descriptor has closed.');
    console.log('Download created: maidcare-pro-project.zip');
  });

  archive.on('error', function(err) {
    throw err;
  });

  archive.pipe(output);

  // Add all project files except node_modules and other unnecessary directories
  const excludeDirs = ['node_modules', '.git', 'dist', '.replit', 'attached_assets'];
  const excludeFiles = ['.env', '.env.local', 'maidcare-pro-project.zip'];

  function addDirectory(dirPath, zipPath = '') {
    const items = fs.readdirSync(dirPath);
    
    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      const zipItemPath = zipPath ? path.join(zipPath, item) : item;
      
      if (excludeFiles.includes(item) || excludeDirs.includes(item)) {
        return;
      }
      
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        addDirectory(fullPath, zipItemPath);
      } else {
        archive.file(fullPath, { name: zipItemPath });
      }
    });
  }

  // Add all project files
  addDirectory('.');
  
  // Add package files
  if (fs.existsSync('package.json')) {
    archive.file('package.json', { name: 'package.json' });
  }
  if (fs.existsSync('package-lock.json')) {
    archive.file('package-lock.json', { name: 'package-lock.json' });
  }

  archive.finalize();
}

createProjectZip();