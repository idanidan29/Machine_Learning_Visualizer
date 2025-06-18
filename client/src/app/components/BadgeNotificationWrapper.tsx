'use client';

import React from 'react';
import { useBadge } from '../contexts/BadgeContext';
import BadgeNotification from './BadgeNotification';

export default function BadgeNotificationWrapper() {
  const { badgeNotification, hideBadgeNotification } = useBadge();
  
  return (
    <BadgeNotification
      badge={badgeNotification?.badge}
      show={badgeNotification?.show || false}
      onClose={hideBadgeNotification}
    />
  );
} 