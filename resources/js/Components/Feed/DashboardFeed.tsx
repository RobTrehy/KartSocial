import React, { useEffect, useState } from 'react';

import * as Cards from './Cards';

interface FeedItem {
  parent: {
    id: number;
  };
  card_type: string;
}

interface GroupFeedItem {
  items: Array<FeedItem>;
}

interface Props {
  feed: Array<FeedItem>;
}

export default function DashboardFeed({ feed }: Props) {
  const [groupedFeed, setGroupedFeed] = useState<Array<GroupFeedItem> | null>(
    null,
  );
  let shown: Array<number> = [];

  useEffect(() => {
    if (feed && !groupedFeed) {
      let _gf: Array<GroupFeedItem> = [];
      feed.map((item: FeedItem, i: number) => {
        if (item.parent) {
          if (!_gf[item.parent.id]) {
            _gf[item.parent.id] = { items: [] };
          }
          _gf[item.parent.id].items[i] = item;
        }
      });
      setGroupedFeed({ ..._gf });
    }
  }, [feed]);

  return groupedFeed
    ? feed.map((item: FeedItem, i: number) => {
        // @ts-ignore
        let C = Cards[item.card_type];
        if (C !== undefined) {
          return <C {...item} key={i} />;
        } else {
          return <p key={i}>Card `{item.card_type}` not found! </p>;
        }
      })
    : null;
}
