import type {NextApiResponse, NextApiRequest} from 'next';
import base64 from 'base-64';

const isProd = process.env.NODE_ENV === 'production';
const enableLogs = process.env.DEBUG_ANALYTICS === 'true';
const ANALYTICS_URL = isProd
  ? 'https://polaris.sfe.shopifyinternal.com/analytics'
  : 'http://localhost:3001/analytics'; // local service

type Event = {
  id: string;
  payload: any;
};

type AnalyticsProducerFunction = (event: Event) => void;

type AnalyticsProducerType = 'log' | 'http';

class AnalyticsProducer {
  constructor(producer: AnalyticsProducerType) {
    this.produce =
      producer === 'http' ? this.produceHttpRequest : this.produceLog;
  }

  public produce: AnalyticsProducerFunction;

  private produceLog(event: Event) {
    if (!isProd && enableLogs) {
      console.log('Analytics event logged', event);
    }
  }

  private async produceHttpRequest(event: Event) {
    if (isProd) {
      try {
        const response = await fetch(ANALYTICS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${
              process.env.SERVICES_API &&
              base64.encode(process.env.SERVICES_API)
            }`,
          },
          body: JSON.stringify(event),
        });
        const data = await response.json();

        if (response.status !== 200 || data.error) {
          logError(`Analytics call failed. Error: ${data.error}`);
        }
      } catch (error) {
        logError(`Analytics call failed. Error: ${error}`);
      }
    }
  }
}

function logError(error: any) {
  if (enableLogs) {
    console.error(error);
  }
}

export async function captureAnalyticsEvent(id: string, payload: any) {
  const event = {
    id,
    payload,
  };

  const producerType = isProd ? 'http' : 'log';

  const analysisProducer = new AnalyticsProducer(producerType);

  analysisProducer.produce(event);
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {body} = req;

  if (!body || !body.id || !body.payload) {
    return res.status(400).send({});
  }

  const event = {
    id: body.id,
    payload: body.payload,
  };

  const producerType = isProd ? 'http' : 'log';

  const analytics = new AnalyticsProducer(producerType);

  analytics.produce(event);

  return res.status(200).send({});
};

export default handler;
