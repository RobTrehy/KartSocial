type DateTime = string;

export type Nullable<T> = T | null;

export interface User {
  id: number;
  name: string;
  alias: string;
  email: string;
  bio: string;
  profile_photo_path: Nullable<string>;
  profile_photo_url: string;
  cover_photo_path: Nullable<string>;
  cover_photo_url: string;
  two_factor_enabled: boolean;
  email_verified_at: Nullable<DateTime>;
  home_track_id: Nullable<number>;
  home_track: Nullable<Track>;
  weight: Nullable<number | string>;
  follows_count: number;
  follows: Array<User>
  followed_by_count: number;
  followed_by: Array<User>;
  invited_count: number;
  roles: Nullable<Array<any>>; // TODO: Role Type
  created_at: DateTime;
  updated_at: DateTime;
}

export interface Auth {
  user: Nullable<User>;
  permissions: Nullable<
    Array<any> // TODO: Permissions array Type
  >;
}

export type InertiaSharedProps<T = {}> = T & {
  app_name: string;
  app_feedback_label: string;
  app_version: string;
  jetstream: {
    canManageTwoFactorAuthentication: boolean;
    canUpdatePassword: boolean;
    canUpdateProfileInformation: boolean;
    flash: any;
    hasAccountDeletionFeatures: boolean;
    hasApiFeatures: boolean;
    hasTermsAndPrivacyPolicyFeature: boolean;
    managesProfilePhotos: boolean;
    hasEmailVerification: boolean;
  };
  max_invites: number;
  auth: Auth;
  errorBags: any;
  errors: any;
  laps: string;
  users: string;
};

export interface Session {
  id: number;
  ip_address: string;
  is_current_device: boolean;
  agent: {
    is_desktop: boolean;
    platform: string;
    browser: string;
  };
  last_active: DateTime;
}

export interface ApiToken {
  id: number;
  name: string;
  abilities: string[];
  last_used_ago: Nullable<DateTime>;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface Track {
  id: number;
  name: string;
  address_1: string;
  address_2: string;
  address_3: string;
  town: string;
  county: string;
  postal_code: string;
  lat: number;
  lng: number;
  type: string;
  url: string;
  number: string;
  layouts: Nullable<Array<TrackLayout>>;
  all_layouts: Nullable<Array<TrackLayout>>;
  retired_layouts: Nullable<Array<TrackLayout>>;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface TrackLayout {
  id: number;
  track_id: number;
  track: Nullable<Track>;
  is_default: boolean;
  name: Nullable<string>;
  length: Nullable<number>;
  laps_count: number;
  my_laps_count: number;
  fastestLap: TrackVisitSessionLap & {
    session: any;
  };
  myFastest: TrackVisitSessionLap & {
    session: any;
  };
  chartData: any;
  retired_at: DateTime;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface TrackVisitSessionLap {
  id: number;
  lap_number: number;
  lap_time: number;
  lap_diff: number;
}