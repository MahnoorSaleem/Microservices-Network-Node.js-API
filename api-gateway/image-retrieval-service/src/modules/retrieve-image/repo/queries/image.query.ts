import { FilterQuery, SortOrder } from 'mongoose';
import ImageModel, {Image} from '../../models/image.model';

interface ListImagesOptions {
  includeDuplicates?: boolean;
  onlyTagged?: { all: boolean; tagIds: string[] };
  pager?: { offset: number; size: number };
  sortBy?: 'modificationDate' | 'metaModificationDate' | 'title' | 'fileSize';
}

export const listImagesQuery = async ({
  includeDuplicates = false,
  onlyTagged = { all: false, tagIds: [] },
  pager = { offset: 0, size: 10 },
  sortBy = 'modificationDate',
}: ListImagesOptions) => {
  // Build the query
  let query: FilterQuery<Image> = {};

  // Filter out duplicates if includeDuplicates is false
  if (!includeDuplicates) {
    query.hash = { $not: { $regex: /^duplicate_/ } }; // Example condition to exclude duplicates
  }

  // Filter by tags if onlyTagged is specified
  if (onlyTagged.tagIds.length > 0) {
    if (onlyTagged.all) {
      query.tags = { $all: onlyTagged.tagIds };
    } else {
      query.tags = { $in: onlyTagged.tagIds };
    }
  }

  // Sort by fields
  let sort: { [key: string]: SortOrder } = {};
  if (sortBy === 'modificationDate') {
    sort = {
      modificationDate: -1,
      uploadDate: -1, // Secondary sort for recent upload or modification date
    };
  } else if (sortBy === 'metaModificationDate') {
    sort.metaModificationDate = -1;
  } else if (sortBy === 'title') {
    sort.title = 1; // Ascending order
  } else if (sortBy === 'fileSize') {
    sort.fileSize = -1;
  }

  // Pagination
  const { offset, size } = pager;

  // Build the final query object
  return ImageModel.find(query).sort(sort).skip(offset).limit(size);
};

export const buildImageQuery = ({
    includeDuplicates = false,
    onlyTagged = { all: false, tagIds: [] },
    sortBy = 'modificationDate',
  }: ListImagesOptions): FilterQuery<Image> => {
    let query: FilterQuery<Image> = {};
  
    if (!includeDuplicates) {
      query.hash = { $not: { $regex: /^duplicate_/ } }; 
    }
  
    if (onlyTagged.tagIds.length > 0) {
      if (onlyTagged.all) {
        query.tags = { $all: onlyTagged.tagIds };
      } else {
        query.tags = { $in: onlyTagged.tagIds };
      }
    }
  
    return query;
};
  
export const buildImageSort = (sortBy: ListImagesOptions['sortBy']): { [key: string]: SortOrder } => {
    let sort: { [key: string]: SortOrder } = {};
    if (sortBy === 'modificationDate') {
      sort = {
        modificationDate: -1,
        uploadDate: -1,
      };
    } else if (sortBy === 'metaModificationDate') {
      sort.metaModificationDate = -1;
    } else if (sortBy === 'title') {
      sort.title = 1;
    } else if (sortBy === 'fileSize') {
      sort.fileSize = -1;
    }
    return sort;
};
  
export const getImageList = async (options: ListImagesOptions) => {
    const query = buildImageQuery(options);
    const sort = buildImageSort(options.sortBy);
  
    const { offset, size } = options.pager ?? { offset: 0, size: 10 };
  
    return ImageModel.find(query).sort(sort).skip(offset).limit(size);
};
  

