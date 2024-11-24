import { Zap, Flame, Droplet, Fence, Trash2, LucideIcon } from 'lucide-react';

export function getIconByService(name: string): LucideIcon {
  switch (name) {
    case 'Газопостачання':
      return Flame;
    case 'Водопостачання':
      return Droplet;
    case 'Світло':
      return Zap;
    case 'Опалення':
      return Fence;
    case 'Вивіз сміття':
      return Trash2;
    default:
      return Zap;
  }
}
