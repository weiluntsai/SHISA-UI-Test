
import { LucideIcon } from 'lucide-react';

export type ChannelStatus = 'live' | 'recording' | 'error' | 'loading';
export type Language = 'en' | 'zh';

export interface Channel {
  id: number;
  name: string;
  status: ChannelStatus;
  color: string;
}

export interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  collapsed: boolean;
  onClick?: () => void;
}
