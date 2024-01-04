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
  notifications: Array<Notification>;
  unread_notifications: Number;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface Notification {
  id: string;
  notifiable_id: number;
  notifiable_type: string;
  type: string;
  data: Array<NotificationData>;
  read_at: DateTime;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface NotificationData {
  title: string;
  message: string;
  url: string;
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
  app_invitation_only: boolean;
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
  slug: string;
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
  layouts: Array<TrackLayout>;
  layouts_count: number;
  all_layouts: Array<TrackLayout>;
  all_layouts_count: number;
  retired_layouts: Nullable<Array<TrackLayout>>;
  retired_layouts_count: number;
  laps: Nullable<Array<TrackSessionLap>>;
  laps_count: number;
  fastest_lap: Nullable<TrackSessionLap>;
  myFastest: Nullable<TrackSessionLap>;
  feed: Array<any>; // TODO: Track Feed
  created_at: DateTime;
  updated_at: DateTime;
}

export interface TrackLayout {
  id: number;
  track_id: number;
  track: Track;
  is_default: boolean;
  name: Nullable<string>;
  length: Nullable<number>;
  laps_count: number;
  my_laps_count: number;
  fastest_lap: TrackSessionLap & {
    session: any;
  };
  myFastest: TrackSessionLap & {
    session: any;
  };
  chartData: any;
  retired_at: DateTime;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface TrackEvent {
  id: number;
  user_id: number;
  name: string;
  slug: string;
  description: string;
  date: DateTime;
  attendees: Array<User & {
    pivot: {
      status_id: number;
      status: {
        id: number;
        value: string;
      }
    }
  }>;
  attending_status: string;
  sessions: Array<TrackSession>;
  fastest_lap: TrackSessionLap;
  track_layout_id: number;
  track_layout: TrackLayout;
}

export interface TrackSession {
  id: number;
  track_event_id: number;
  order: number;
  name: string;
  type: string;
  length: number;
  length_type: string;
  laps: Array<TrackSessionLap>;
  fastest_lap: TrackSessionLap;
  total_drivers: number;
  drivers: Array<Driver>;
}

export interface TrackSessionLap {
  id: number;
  lap_number: number;
  lap_time: number;
  lap_diff: number | null;
  driver: User;
  session: TrackSession;
}

export type Driver = User & {
  pivot: {
    id: number,
    user_id: number,
    position: number,
    track_session_id: number;
  };
  laps: Array<TrackSessionLap>;
  fastest_lap: TrackSessionLap;
};

export interface TrackVisit {
  id: number;
  user_id: number;
  driver: User;
  title: string;
  notes: string;
  visit_date: DateTime;
  sessions: Array<TrackVisitSession>;
  fastest_lap: TrackVisitSessionLap;
  track_layout_id: number;
  track_layout: TrackLayout;
  linked_visits: Array<TrackVisit>;
}

export interface TrackVisitSession {
  id: number;
  track_visit_id: number;
  session_name: string;
  session_length: number;
  session_length_type: string;
  laps: Array<TrackVisitSessionLap>;
  fastest_lap: TrackVisitSessionLap;
  finish_position: number;
  total_drivers: number;
}

export interface TrackVisitSessionLap {
  id: number;
  lap_number: number;
  lap_time: number;
  lap_diff: number | null;
  session: TrackVisitSession;
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