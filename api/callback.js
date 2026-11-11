export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    res.status(400).send('Missing OAuth code');
    return;
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      res.status(401).send('GitHub OAuth error: ' + data.error_description);
      return;
    }

    const token = data.access_token;
    const content = JSON.stringify({ token: token, provider: 'github' });
    const message = 'authorization:github:success:' + content;

    res.setHeader('Content-Type', 'text/html');
    res.send(
      '<!doctype html><html><body><script>' +
      'var msg = ' + JSON.stringify(message) + ';' +
      'function cb(e){window.opener.postMessage(msg,e.origin);}' +
      'window.addEventListener("message",cb,false);' +
      'window.opener.postMessage("authorizing:github","*");' +
      '<\/script></body></html>'
    );
  } catch (err) {
    res.status(500).send('Server error: ' + err.message);
  }
}

