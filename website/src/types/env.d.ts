interface PhotoData {
  id: string;
  slug: string;
  alternative_slugs: {
    [key: string]: string;
  };
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: null | string;
  alt_description: string;
  breadcrumbs: any[];
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: null | any;
  topic_submissions: {
    [key: string]: {
      status: string;
      approved_on: string;
    };
  };
  status: string;
  approved_on: string;
  asset_type: string;
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: null | string;
    portfolio_url: string | null;
    bio: string;
    location: string;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
      following: string;
      followers: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    total_promoted_photos: number;
    total_illustrations: number;
    total_promoted_illustrations: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: {
      instagram_username: string;
      portfolio_url: string | null;
      twitter_username: string | null;
      paypal_email: string | null;
    };
  };
  exif: {
    make: null | string;
    model: null | string;
    name: null | string;
    exposure_time: null | string;
    aperture: null | string;
    focal_length: null | string;
    iso: null | number;
    location: {
      name: null | string;
      city: null | string;
      country: null | string;
      position: {
        latitude: number;
        longitude: number;
      };
    };
  };
  views: number;
  downloads: number;
}

interface ModalWIndowProps {
  item: PhotoData | undefined;
  close: () => void;
}

interface HeaderProps {
  mobileMode: boolean
  rows: number;
  setRows: React.Dispatch<SetStateAction<number>>;
}

interface MeResponse {
  access_token: string;
}

interface User {
  user_id?: string;
  email: string;
  password?: string;
  access_token?: string;
}
