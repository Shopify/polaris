const ANALYTICS_URL = 'http://localhost:3001/analytics';

export async function logAnalyticsEvent(schema: string, payload: any) {
  const event = {
    schema,
    payload,
  };

  if (process.env.NODE_ENV) {
    try {
      const response = await fetch(ANALYTICS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      console.log('analytics response', response);
    } catch (error) {
      console.error('Analytics event failed', error);
    }
  } else {
    console.log('analytics event logged', event);
  }
}
