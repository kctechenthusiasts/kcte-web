import type { Handler } from '@netlify/functions';

const handler: Handler = async () => {
  const apiToken = process.env.NETLIFY_API_TOKEN;
  const siteId = process.env.SITE_ID;

  if (!apiToken) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'NETLIFY_API_TOKEN environment variable is not set' }),
    };
  }

  if (!siteId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'SITE_ID environment variable is not set' }),
    };
  }

  try {
    // Get forms for the site to find the topic-suggestions form
    const formsResponse = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/forms`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!formsResponse.ok) {
      throw new Error(`Failed to fetch forms: ${formsResponse.statusText}`);
    }

    const forms = await formsResponse.json();
    const topicForm = forms.find((form: { name: string }) => form.name === 'topic-suggestions');

    if (!topicForm) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ submissions: [] }),
      };
    }

    // Get submissions for the topic-suggestions form
    const submissionsResponse = await fetch(
      `https://api.netlify.com/api/v1/forms/${topicForm.id}/submissions`,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );

    if (!submissionsResponse.ok) {
      throw new Error(`Failed to fetch submissions: ${submissionsResponse.statusText}`);
    }

    const submissions = await submissionsResponse.json();

    // Map to only include the fields we need
    const mappedSubmissions = submissions.map((submission: {
      id: string;
      created_at: string;
      data: {
        name?: string;
        'topic-name'?: string;
        'topic-description'?: string;
      };
    }) => ({
      id: submission.id,
      createdAt: submission.created_at,
      name: submission.data.name || 'Anonymous',
      topicName: submission.data['topic-name'] || 'Untitled',
      topicDescription: submission.data['topic-description'] || '',
    }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ submissions: mappedSubmissions }),
    };
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch submissions' }),
    };
  }
};

export { handler };
