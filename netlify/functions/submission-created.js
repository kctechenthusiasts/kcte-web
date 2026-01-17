// This function name is special - Netlify auto-triggers it on form submissions
export default async (req) => {
  try {
    const { payload } = await req.json();

    // payload.data contains your form fields
    const { name, message } = payload.data;

    // Don't process if honeypot was filled (bot submission)
    if (payload.data['bot-field']) {
      return new Response('Bot detected', { status: 200 });
    }

    // Post to Discord
    const discordResponse = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: '📬 New Message from Website',
          color: 0x5865F2, // Discord blurple
          fields: [
            { name: 'From', value: name || 'Anonymous', inline: true },
            { name: 'Message', value: message || '(empty)' }
          ],
          timestamp: new Date().toISOString()
        }]
      })
    });

    if (!discordResponse.ok) {
      console.error('Discord error:', await discordResponse.text());
      return new Response('Discord error', { status: 500 });
    }

    return new Response('OK', { status: 200 });

  } catch (error) {
    console.error('Function error:', error);
    return new Response('Error', { status: 500 });
  }
};
