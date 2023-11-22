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
  roles: Nullable<Array<Role>>;
  restriction: Nullable<UserRestriction>;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface UserRestriction {
  id: number;
  user_id: number;
  user: User;
  restrictor_id: number;
  restrictor: User;
  reason: string;
  appeals: Nullable<Array<UserRestrictionAppeals>>;
  expires_at: Nullable<DateTime>;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface UserRestrictionAppeals {
  id: number;
  restriction_id: number;
  restriction: UserRestriction;
  user: User;
  commenter_id: number;
  commenter: User;
  appeal: string;
  allow_reply: boolean;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface Auth {
  user: Nullable<User>;
  permissions: Nullable<Array<string>>;
}

export interface Role {
  id: number;
  name: string;
  colors: {
    background: string;
    border: string;
  }
  pivot: {
    cost: number;
    expires_at: DateTime;
    created_at: DateTime;
    updated_at: DateTime;
  }
}

export interface Permission {
  id: number;
  name: string;
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
  fastestLap: Nullable<TrackVisitSessionLap>;
  myFastest: Nullable<TrackVisitSessionLap>;
  feed: Array<any>; // TODO: Track Feed
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

export interface TrackVisit {
  id: number;
  user_id: number;
  title: string;
  notes: string;
  visit_date: DateTime;
  sessions: Array<TrackVisitSession>;
  track_layout_id: number;
  track_layout: TrackLayout;
}

export interface TrackVisitSession {
  id: number;
  track_visit_id: number;
  session_name: string;
  session_length: number;
  session_length_type: string;
  laps: Array<TrackVisitSessionLap>;
  fastestLap: TrackVisitSessionLap;
  finish_position: number;
  total_drivers: number;
}

export interface TrackVisitSessionLap {
  id: number;
  lap_number: number;
  lap_time: number;
  lap_diff: number | null;
}

export interface PaginationData {
  prev_page_url: string;
  next_page_url: string;
  from: number;
  to: number;
  total: number;
  current_page: number;
  links: Array<Link>;
}

export interface Link {
  active: boolean;
  url: string;
  label: string;
}