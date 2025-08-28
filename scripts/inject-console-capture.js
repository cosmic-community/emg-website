const fs = require('fs');
const path = require('path');

// Path to the console capture script
const scriptPath = path.join(__dirname, '..', 'public', 'dashboard-console-capture.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Script tag to inject
const scriptTag = `<script>${scriptContent}</script>`;

// Function to inject script into HTML files
function injectIntoHtml(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if script is already injected
  if (content.includes('console-capture-ready')) return;
  
  // Inject before closing head tag, or at the beginning of body
  if (content.includes('</head>')) {
    content = content.replace('</head>', `  ${scriptTag}\n  </head>`);
  } else if (content.includes('<body')) {
    content = content.replace(/(<body[^>]*>)/, `$1\n  ${scriptTag}`);
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Injected console capture into: ${filePath}`);
}

// Function to recursively find HTML files
function findHtmlFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findHtmlFiles(fullPath));
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Main injection process
function main() {
  console.log('🚀 Injecting console capture script...');
  
  // Common build output directories
  const buildDirs = ['.next', 'out', 'dist', 'build'];
  
  for (const dir of buildDirs) {
    const buildPath = path.join(__dirname, '..', dir);
    if (fs.existsSync(buildPath)) {
      const htmlFiles = findHtmlFiles(buildPath);
      htmlFiles.forEach(injectIntoHtml);
    }
  }
  
  console.log('✨ Console capture injection complete!');
}

main();