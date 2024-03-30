import { SSTConfig } from 'sst';
import { NextjsSite } from 'sst/constructs';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';

const certArn =
  'arn:aws:acm:us-east-1:319653899185:certificate/a54f1d93-e441-42eb-9165-29ca329446ad';

export default {
  config(_input) {
    return {
      name: 'north-path',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, 'site', {
        customDomain: {
          domainName: 'www.north-path.site',
          isExternalDomain: true,
          cdk: {
            certificate: Certificate.fromCertificateArn(
              stack,
              'MyCert',
              certArn
            ),
          },
        },
        environment: {
          NEXT_PUBLIC_BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_API ?? '',
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
