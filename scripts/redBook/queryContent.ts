import { NoteCard } from './fetchRedBook';

export const extractTextFromHTML = (item: NoteCard): string => {
  return item.displayTitle + '\n' + item.desc;
};

export const extractImagesFromHTML = (item: NoteCard): string[] => {
  return item.imageList.map((i) => i.urlDefault);
};
