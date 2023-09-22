import * as fflate from 'https://cdn.skypack.dev/fflate@0.8.0?min';

window.fflate = fflate;

function genZIP() {
  console.log('zip click');
  let buf = new Uint8Array();

  const zip = new fflate.Zip((err, data, final) => {
    if (err) {
      console.info(`%c🇨🇳ERROR`, 'font-size:25px;color:deeppink;', err);
      return;
    }

    buf = new Uint8Array([...buf, ...data]);
    window.buf = buf;
    console.log('-- zip data--', data);

    if (final) {
      console.log('zip 完成了');
      window.blob = new Blob([buf], { type: 'application/octet-stream' });

      const url = URL.createObjectURL(window.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'hello.zip';
      a.click();
    }
  });

  const helloTxt = new fflate.ZipDeflate('hello.txt', { level: 9 });
  zip.add(helloTxt);

  window.helloTxt = helloTxt;
  window.zip = zip;

  for (let i = 0; i < 100; i++) {
    helloTxt.push(fflate.strToU8(i.toString()));
  }
  helloTxt.push([], true);
  zip.end();
}

function zip2() {
  const zipped = fflate.zipSync(
    {
      // Directories can be nested structures, as in an actual filesystem
      dir1: {
        nested: {
          // You can use Unicode in filenames
          '你好.txt': fflate.strToU8('Hey there!'),
        },
        // You can also manually write out a directory path
        'other/tmp.txt': new Uint8Array([97, 98, 99, 100]),
      },

      // Directories take options too
      exec: [
        {
          'hello.sh': [
            fflate.strToU8('echo hello world'),
            {
              // ZIP only: Set the operating system to Unix
              os: 3,
              // ZIP only: Make this file executable on Unix
              attrs: 0o755 << 16,
            },
          ],
        },
        {
          // ZIP and GZIP support mtime (defaults to current time)
          mtime: new Date('10/20/2020'),
        },
      ],
    },
    {
      // These options are the defaults for all files, but file-specific
      // options take precedence.
      level: 1,
      // Obfuscate last modified time by default
      mtime: new Date('1/1/1980'),
    }
  );
  let blob = new Blob([zipped], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'hello.zip';
  a.click();
  console.log('zip2 结果：', zipped);
}

const zipEl = document.querySelector('#zip');
zipEl.onclick = genZIP;
