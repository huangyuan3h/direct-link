export const fetchImage = async (url: string): Promise<Blob | null> => {
  try {
    const imageResponse = await fetch(url);
    const imageBlob = await imageResponse.blob();
    return imageBlob;
  } catch (error) {
    console.error(`fetch image ${url}:`, error);
  }

  return null;
};

export const getImageContentFromBlob = async (blob: Blob): Promise<string> => {
  const buffer = Buffer.from(await blob.arrayBuffer());
  return buffer.toString('base64');
};
