import { SSTConfig } from 'sst';
import { NextjsSite, Bucket } from 'sst/constructs';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';

const certArn =
  'arn:aws:acm:us-east-1:319653899185:certificate/dde24c52-09e4-4058-b1d0-2a7769f24e3a';

export default {
  config(_input) {
    return {
      name: 'north-path',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const bucket = new Bucket(stack, 'public-image');

      const customDomain = {
        domainName: 'north-path.it-t.xyz',
        isExternalDomain: true,
        cdk: {
          certificate: Certificate.fromCertificateArn(stack, 'MyCert', certArn),
        },
      };

      const site = new NextjsSite(stack, 'site', {
        customDomain: stack.stage === 'prod' ? customDomain : undefined,
        bind: [bucket],
        environment: {
          NEXT_PUBLIC_BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_API ?? '',
          NEXT_PUBLIC_BUCKET_NAME: bucket.bucketName,
          NEXT_PUBLIC_AVATAR_BUCKET_NAME:
            process.env.NEXT_PUBLIC_AVATAR_BUCKET_NAME ?? '',
          NEXT_PUBLIC_IMAGE_CDN: process.env.NEXT_PUBLIC_IMAGE_CDN ?? '',
          NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV ?? 'dev',
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
