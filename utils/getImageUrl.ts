export const getImageUrl = (url: string): string => {
  if (
    !process.env.NEXT_PUBLIC_ENV ||
    !process.env.NEXT_PUBLIC_BUCKET_NAME ||
    !process.env.NEXT_PUBLIC_IMAGE_CDN ||
    process.env.NEXT_PUBLIC_ENV !== 'prod' ||
    !url.includes(process.env.NEXT_PUBLIC_BUCKET_NAME)
  )
    return url;

  return url.replace(
    `https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.us-east-1.amazonaws.com/`,
    process.env.NEXT_PUBLIC_IMAGE_CDN
  );
};
