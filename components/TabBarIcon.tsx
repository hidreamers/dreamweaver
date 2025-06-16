import { FontAwesome } from '@expo/vector-icons';
import React from 'react';

export default function TabBarIcon({
  name,
  color,
}: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} name={name} color={color} />;
}