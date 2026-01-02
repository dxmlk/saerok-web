export interface Bird {
  birdId: number;
  koreanName: string;
  scientificName?: string;
}

export interface User {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  thumbnailProfileImageUrl: string;
}

export interface CollectionItem {
  collectionId: number;
  createdAt: string;
  imageUrl: string;
  discoveredDate: string;
  latitude: number;
  longitude: number;
  locationAlias: string;
  address: string;
  note: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isPopular: boolean;
  suggestionUserCount: number | null;
  bird: Bird;
  user: User;
}

export interface CollectionItemList {
  items: CollectionItem[];
}
