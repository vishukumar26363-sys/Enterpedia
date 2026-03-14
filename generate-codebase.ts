import fs from 'fs';
import path from 'path';

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const srcDir = path.join(process.cwd(), 'src');
const allFiles = getAllFiles(srcDir).filter(file => 
  (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css')) && 
  !file.includes('codebaseData.ts')
);

// Explicitly add index.html and package.json from the root directory
const extraFiles = [
  'index.html',
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.node.json'
];

extraFiles.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    allFiles.push(fullPath);
  }
});

const codebaseData: Record<string, string> = {};

allFiles.forEach(file => {
  const relativePath = path.relative(process.cwd(), file);
  const content = fs.readFileSync(file, 'utf-8');
  codebaseData[relativePath] = content;
});

const outputContent = `export const codebaseData = ${JSON.stringify(codebaseData, null, 2)};`;
fs.writeFileSync(path.join(srcDir, 'codebaseData.ts'), outputContent);
console.log('Codebase data generated successfully.');
