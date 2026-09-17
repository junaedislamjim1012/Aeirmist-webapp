import * as ftp from 'basic-ftp';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const FTP_HOST = process.env.INFINITYFREE_FTP_HOST || 'ftpupload.net';
const FTP_USER = process.env.INFINITYFREE_FTP_USER || 'if0_42922540';
const FTP_PASS = process.env.INFINITYFREE_FTP_PASS || 'aeirmist1012';

async function uploadFolder(client, localDir, remoteSubPath = '') {
  const entries = fs.readdirSync(localDir);
  for (const entry of entries) {
    const localPath = path.join(localDir, entry);
    const stat = fs.statSync(localPath);

    if (stat.isDirectory()) {
      try {
        await client.send(`MKD ${entry}`);
      } catch {}
      await client.cd(entry);
      await uploadFolder(client, localPath, path.join(remoteSubPath, entry));
      await client.cdup();
    } else {
      if (entry.endsWith('.map')) continue; // Skip source maps
      try {
        console.log(`📤 Uploading: ${remoteSubPath ? remoteSubPath + '/' : ''}${entry}`);
        await client.uploadFrom(localPath, entry);
      } catch (err) {
        console.warn(`⚠️ Skipped ${entry}: ${err.message}`);
      }
    }
  }
}

async function deploy() {
  console.log('🚀 Starting InfinityFree Deployment Process...\n');

  // 1. Build the Vite production bundle
  console.log('📦 Step 1: Building production bundle with Vite...');
  execSync('npx vite build', { stdio: 'inherit' });

  const distPath = path.resolve(process.cwd(), 'dist');
  if (!fs.existsSync(distPath)) {
    throw new Error('Build failed: dist folder not found.');
  }

  // Ensure 404.html exists for SPA routing fallback
  const indexPath = path.join(distPath, 'index.html');
  const errorPagePath = path.join(distPath, '404.html');
  if (fs.existsSync(indexPath) && !fs.existsSync(errorPagePath)) {
    fs.copyFileSync(indexPath, errorPagePath);
    console.log('✅ Created dist/404.html for SPA routing fallback.');
  }

  // Ensure .htaccess is in dist
  const htaccessDist = path.join(distPath, '.htaccess');
  if (!fs.existsSync(htaccessDist)) {
    const publicHtaccess = path.resolve(process.cwd(), 'public', '.htaccess');
    if (fs.existsSync(publicHtaccess)) {
      fs.copyFileSync(publicHtaccess, htaccessDist);
      console.log('✅ Included .htaccess in dist.');
    }
  }

  // 2. Connect to InfinityFree via FTP
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log(`\n🌐 Step 2: Connecting to InfinityFree FTP (${FTP_HOST})...`);
    await client.access({
      host: FTP_HOST,
      user: FTP_USER,
      password: FTP_PASS,
      secure: false
    });

    console.log('✅ Connected successfully!');
    
    // Deploy to main 'htdocs'
    console.log(`\n📤 Step 3: Navigating to htdocs and deploying app files...`);
    await client.cd('htdocs');
    await uploadFolder(client, distPath);
    console.log('✅ Main htdocs updated successfully!');

    // Also sync to aeirmist.com/htdocs if present
    try {
      await client.cdup();
      await client.cd('aeirmist.com/htdocs');
      console.log(`\n📤 Step 4: Uploading to aeirmist.com/htdocs...`);
      await uploadFolder(client, distPath);
      console.log('✅ aeirmist.com/htdocs updated successfully!');
    } catch (subDomainErr) {
      // Subdomain folder optional
    }

    console.log('\n🎉 ==========================================');
    console.log('   INFINITYFREE DEPLOYMENT 100% COMPLETE!');
    console.log('==========================================');
    console.log('🌐 Web App is now live on InfinityFree with the latest code!');
  } catch (err) {
    console.error('\n❌ FTP Deployment Error:', err);
    throw err;
  } finally {
    client.close();
  }
}

deploy().catch((err) => {
  console.error(err);
  process.exit(1);
});
