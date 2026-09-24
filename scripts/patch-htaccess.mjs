import * as ftp from 'basic-ftp';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const FTP_HOST = process.env.INFINITYFREE_FTP_HOST || 'ftpupload.net';
const FTP_USER = process.env.INFINITYFREE_FTP_USER || 'if0_42922540';
const FTP_PASS = process.env.INFINITYFREE_FTP_PASS || 'aeirmist1012';

async function patch() {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    console.log('Connecting to FTP...');
    await client.access({
      host: FTP_HOST,
      user: FTP_USER,
      password: FTP_PASS,
      secure: false
    });
    console.log('Connected!');

    const localHtaccess = path.resolve('public', '.htaccess');

    // 1. Upload to htdocs
    await client.cd('htdocs');
    await client.uploadFrom(localHtaccess, '.htaccess');
    console.log('✅ Uploaded to /htdocs/.htaccess');

    // 2. Upload to aeirmist.com/htdocs
    try {
      await client.cdup();
      await client.cd('aeirmist.com/htdocs');
      await client.uploadFrom(localHtaccess, '.htaccess');
      console.log('✅ Uploaded to /aeirmist.com/htdocs/.htaccess');
    } catch (e) {
      console.warn('Subfolder upload notice:', e.message);
    }
  } catch (err) {
    console.error('FTP Error:', err);
  } finally {
    client.close();
  }
}

patch();
