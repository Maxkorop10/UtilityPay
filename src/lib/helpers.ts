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

export function translateStatus(status: string): string {
  switch (status) {
    case 'CREATED':
      return 'Заявку створено';
    case 'UNDER_ADMIN_REVIEW':
      return 'На розгляді адміністратора';
    case 'UNDER_COMPANY_REVIEW':
      return 'На розгляді компанії';
    case 'IN_PROGRESS':
      return 'В процесі виконання';
    case 'COMPLETED':
      return 'Виконано';
    case 'REJECTED_BY_COMPANY':
      return 'Відхилено компанією';
    case 'REJECTED_BY_ADMIN':
      return 'Відхилено адміністрацією';
    default:
      return 'Невідомий статус';
  }
}

export function getServiceInfo(name: string): string {
  switch (name) {
    case 'Газопостачання':
      return 'м³';
    case 'Водопостачання':
      return 'м³';
    case 'Світло':
      return 'кВт·год';
    case 'Опалення':
      return 'Гкал';
    case 'Вивіз сміття':
      return 'м³';
    default:
      return '';
  }
}
